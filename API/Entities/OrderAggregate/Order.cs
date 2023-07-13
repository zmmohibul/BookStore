using System.ComponentModel.DataAnnotations.Schema;
using API.Entities.Identity;

namespace API.Entities.OrderAggregate;

public class Order
{
    public int Id { get; set; }

    public User OrderedByUser { get; set; }
    public string OrderedByUserId { get; set; }

    public int UserAddressId { get; set; }
    public Address UserAddress { get; set; }

    [Column(TypeName = "decimal(8, 2)")]
    public decimal Subtotal { get; set; }
    
    [Column(TypeName = "varchar(50)")]
    public OrderStatus OrderStatus { get; set; } = OrderStatus.OrderPlaced;
    public DateTime OrderDate { get; set; } = DateTime.UtcNow;

    public ICollection<OrderItem> OrderedBooks { get; set; } = new List<OrderItem>();
}