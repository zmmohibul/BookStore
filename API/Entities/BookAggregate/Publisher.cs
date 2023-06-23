using System.ComponentModel.DataAnnotations;

namespace API.Entities.BookAggregate;

public class Publisher
{
    public int Id { get; set; }
    
    [MaxLength(100)]
    public string Name { get; set; }
    
    public ICollection<Book> Books { get; set; } = new List<Book>();
}