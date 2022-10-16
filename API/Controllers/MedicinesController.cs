using API.Data;
using API.DTO;
using API.Entities;
using API.Extensions;
using API.RequestHelpers;
using API.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace API.Controllers
{
    
    public class MedicinesController : BaseApiController
    {
        private readonly StoreContext _context;
        private readonly IMapper _mapper;
        private readonly ImageService _imageService;

        public MedicinesController(StoreContext context,IMapper mapper, ImageService imageService)
        {
            _context = context;
            _mapper = mapper;
            _imageService = imageService;
        }

        [HttpGet]
        public async Task<ActionResult<PagedList<Medicine>>> GetMedicines([FromQuery]ProductParams productParams)
        {
           var query =_context.Medicines
                .Sort(productParams.OrderBy)
                .Search(productParams.SearchTerm)
                .Filter(productParams.Brands, productParams.Categories)
                .AsQueryable();

            var medicines = await PagedList<Medicine>.ToPagedList(query,
                productParams.PageNumber, productParams.PageSize);
            Response.AddPaginationHeader(medicines.MetaData);

            return medicines;
        }

        [HttpGet("{id}", Name = "GetMedicine")]
        public  async Task<ActionResult<Medicine>> GetMedicine(int id)
        {
            return await _context.Medicines.FindAsync(id);
        }

        [HttpGet("filters")]
        public async Task<IActionResult> GetFilters()
        {
            var brands = await _context.Medicines.Select(p => p.Brand).Distinct().ToListAsync();
            var categories = await _context.Medicines.Select(p => p.Category).Distinct().ToListAsync();

            return Ok(new { brands, categories});
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<Medicine>> CreateMedicine([FromForm]CreateMedicineDto medicineDto)
        {
            var medicine = _mapper.Map<Medicine>(medicineDto);

            if (medicineDto.File != null)
            {
                var imageResult = await _imageService.AddImageAsync(medicineDto.File);

                if (imageResult.Error != null)
                    return BadRequest(new ProblemDetails { Title = imageResult.Error.Message });

                medicine.PictureUrl = imageResult.SecureUrl.ToString();
                medicine.PublicId = imageResult.PublicId;
            }

            _context.Medicines.Add(medicine);

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return CreatedAtRoute("GetMedicine", new { Id = medicine.Id }, medicine);

            return BadRequest(new ProblemDetails { Title = "Problem creating new product" });
        }

        [Authorize(Roles = "Admin")]
        [HttpPut]
        public async Task<ActionResult<Medicine>> UpdateMedicine([FromForm]UpdateMedicineDto medicineDto)
        {
            var medicine = await _context.Medicines.FindAsync(medicineDto.Id);

            if (medicine == null) return NotFound();

            _mapper.Map(medicineDto, medicine);

            if (medicineDto.File != null)
            {
                var imageResult = await _imageService.AddImageAsync(medicineDto.File);

                if (imageResult.Error != null)
                    return BadRequest(new ProblemDetails { Title = imageResult.Error.Message });

                if (!string.IsNullOrEmpty(medicine.PublicId))
                    await _imageService.DeleteImageAsync(medicine.PublicId);

                medicine.PictureUrl = imageResult.SecureUrl.ToString();
                medicine.PublicId = imageResult.PublicId;
            }

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return Ok(medicine);

            return BadRequest(new ProblemDetails { Title = "Problem updating medicine" });
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteMedicine(int id)
        {
            var medicine = await _context.Medicines.FindAsync(id);

            if (medicine == null) return NotFound();

            if (!string.IsNullOrEmpty(medicine.PublicId))
                await _imageService.DeleteImageAsync(medicine.PublicId);

            _context.Medicines.Remove(medicine);

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return Ok();

            return BadRequest(new ProblemDetails { Title = "Problem deleting medicine" });
        }
    }
}
