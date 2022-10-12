using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class StoreContext : DbContext
    {
        public StoreContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Medicine> Medicines { get; set; }
        public DbSet<Cart> Carts { get; set; }
    }
}
