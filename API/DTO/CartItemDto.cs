namespace API.DTO
{
    public class CartItemDto
    {
        public int MedicineId { get; set; }
        public string Name { get; set; }
        public long Price { get; set;}
        public string PictureUrl {get; set;}
        public string Brand { get; set;}
        public string Category {get; set;}
        public int Quantity { get; set;}    

    }
}