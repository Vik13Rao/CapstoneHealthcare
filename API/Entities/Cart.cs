using System.Collections.Generic;
using System.Linq;

namespace API.Entities
{
    public class Cart
    {
        public int Id { get; set; }
        
        public string BuyerId { get; set; }

        public List<CartItem> Items { get; set; } = new();

        public void AddItem(Medicine medicine, int quantity)
        {
            if (Items.All(item => item.MedicineId != medicine.Id))
            {
                Items.Add(new CartItem { Medicine = medicine, Quantity = quantity });
            }

            var existingItem = Items.FirstOrDefault(item => item.MedicineId == medicine.Id);
            if (existingItem != null) existingItem.Quantity += quantity;
        }

        public void RemoveItem(int medicineId, int quantity)
        {
            var item = Items.FirstOrDefault(item => item.MedicineId == medicineId);
            if (item == null) return;
            item.Quantity -= quantity;
            if (item.Quantity == 0) Items.Remove(item);
        }
       
    }

}