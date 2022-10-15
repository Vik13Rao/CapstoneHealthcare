using API.DTO;
using API.Entities;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace API.Extensions
{
    public static class CartExtensions
    {
        public static CartDto MapCartToDto(this Cart cart)
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

        public static IQueryable<Cart> RetrieveCartWithItems(this IQueryable<Cart> query, string buyerId)
        {
            return query.Include(i => i.Items).ThenInclude(p => p.Medicine).Where(b => b.BuyerId == buyerId);
        }
    }
}
