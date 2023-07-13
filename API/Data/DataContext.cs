using API.Entities.BookAggregate;
using API.Entities.Identity;
using API.Entities.OrderAggregate;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class DataContext : IdentityDbContext<User>
{
    public DataContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<Book> Books { get; set; }
    public DbSet<Author> Authors { get; set; }
    public DbSet<Publisher> Publishers { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Order> Orders { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.Entity<OrderItem>()
            .OwnsOne(o => o.BookDetails);
        
        
        builder.Entity<Order>()
            .HasMany(o => o.OrderedBooks).WithOne().OnDelete(DeleteBehavior.Cascade);
        
        base.OnModelCreating(builder);
    }
}