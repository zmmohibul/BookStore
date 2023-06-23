using System.ComponentModel.DataAnnotations;

namespace API.DTOs.Book;

public class CreateBookDto
{
    [Required]
    public string Name { get; set; }
    
    [Required]
    public string Description { get; set; }
    
    [Required]
    public ICollection<int> AuthorsId { get; set; } = new List<int>();
    
    [Required]
    public int PublisherId { get; set; }

    [Required]
    public decimal PaperbackPrice { get; set; }
    [Required]
    public int PaperbackQuantity { get; set; }
    
    [Required]
    public decimal HardcoverPrice { get; set; }
    [Required]
    public int HardcoverQuantity { get; set; }
    
    [Required]
    public ICollection<int> CategoriesId { get; set; } = new List<int>();
    
    [Required]
    public int PrintLength { get; set; }
    
    [Required] [MaxLength(50)]
    public string Language { get; set; }
    
    [Required]
    public DateTime PublicationDate { get; set; }
    
    [Required] [MaxLength(50)]
    public string Isbn13 { get; set; }
}