using API.DTOs.Author;
using API.DTOs.Category;
using API.DTOs.Publisher;

namespace API.DTOs.Book;

public class BookDto
{
    public int Id { get; set; }
    
    public string Name { get; set; }
    public string Description { get; set; }
    public ICollection<PictureDto> Pictures { get; set; } = new List<PictureDto>();

    public ICollection<AuthorDto> Authors { get; set; } = new List<AuthorDto>();
    
    public PublisherDto Publisher { get; set; }
    
    public decimal PaperbackPrice { get; set; }
    public int PaperbackQuantity { get; set; }
    
    public decimal HardcoverPrice { get; set; }
    public int HardcoverQuantity { get; set; }

    public ICollection<CategoryDto> Categories { get; set; } = new List<CategoryDto>();
    
    public int PrintLength { get; set; }
    public string Language { get; set; }
    public DateTime PublicationDate { get; set; }
    public string Isbn13 { get; set; }
}