using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities;

public class Book
{
    public int Id { get; set; }
    public string Name { get; set; }
    
    [Column(TypeName = "decimal(8, 2)")]
    public decimal Price { get; set; }
}