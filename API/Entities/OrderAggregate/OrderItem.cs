using System.ComponentModel.DataAnnotations.Schema;
using API.Entities.BookAggregate;

namespace API.Entities.OrderAggregate;

public class OrderItem
{
    public int Id { get; set; }

    public OrderedBook BookDetails { get; set; }

    [Column(TypeName = "decimal(8, 2)")]
    public decimal Price { get; set; }
    public int Quantity { get; set; }
}