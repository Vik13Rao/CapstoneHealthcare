using Microsoft.EntityFrameworkCore;

namespace API.Entities.OrderAggregate
{
    [Owned]
    public class MedicineItemOrdered
    {
        public int MedicineId { get; set; }
        public string Name { get; set; }
        public string PictureUrl { get; set; }
    }
}
