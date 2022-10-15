namespace API.DTO
{
    public class OrderItemDto
    {
        public int MedicineId { get; set; }
        public string Name { get; set; }
        public string PictureUrl { get; set; }
        public long Price { get; set; }
        public int Quantity { get; set; }
    }
}
