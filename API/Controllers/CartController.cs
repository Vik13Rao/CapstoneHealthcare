using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Xml.Linq;
using System;
using System.Linq;
using Microsoft.AspNetCore.Http;
using API.DTO;

namespace API.Controllers
{
    public class CartController : BaseApiController
    {
        private readonly StoreContext _context;

        public CartController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet(Name = "GetCart")]
        public async Task<ActionResult<CartDto>> GetCart()
        {
            var cart = await RetrieveCart();

            if (cart == null) return NotFound();
            return MapCartToDto(cart);
        }

        


        [HttpPost]
        public async Task<ActionResult<CartDto>> AddItemToCart(int medicineId, int quantity)
        {
            var cart = await RetrieveCart();

            if (cart == null) cart = CreateCart();

            var medicine = await _context.Medicines.FindAsync(medicineId);

            if (medicine == null) return NotFound();

            cart.AddItem(medicine, quantity);

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return CreatedAtRoute("GetCart", MapCartToDto(cart));

            return BadRequest(new ProblemDetails { Title = "Problem saving item to cart" });
        }

      

        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int medicineId, int quantity)
        {
            var cart = await RetrieveCart();

            if (cart== null) return NotFound();

            cart.RemoveItem(medicineId, quantity);

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return Ok();

            return BadRequest(new ProblemDetails { Title = "Problem removing item from the cart" });
        }

        private async Task<Cart> RetrieveCart()
        {
            return await _context.Carts
                  .Include(i => i.Items)
                  .ThenInclude(p => p.Medicine)
                  .FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies["buyerId"]);
        }

        private Cart CreateCart()
        {
            var buyerId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };
            Response.Cookies.Append("buyerId", buyerId, cookieOptions);
            var cart = new Cart { BuyerId = buyerId };
            _context.Carts.Add(cart);
            return cart;
        }

        private CartDto MapCartToDto(Cart cart)
        {
            return new CartDto
            {
                Id = cart.Id,
                BuyerId = cart.BuyerId,
                Items = cart.Items.Select(item => new CartItemDto
                {
                    MedicineId = item.MedicineId,
                    Name = item.Medicine.Name,
                    Price = item.Medicine.Price,
                    PictureUrl = item.Medicine.PictureUrl,
                    Category = item.Medicine.Category,
                    Brand = item.Medicine.Brand,
                    Quantity = item.Quantity

                }).ToList()
            };
        }





    }
}
