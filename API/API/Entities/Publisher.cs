using System.ComponentModel.DataAnnotations;

namespace API.Entities;

public class Publisher
{
    public int Id { get; set; }
    
    [MaxLength(100)]
    public string Name { get; set; }
    
    public List<Book> Books { get; set; } = new List<Book>();
}