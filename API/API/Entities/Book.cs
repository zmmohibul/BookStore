using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities;

public class Book
{
    public int Id { get; set; }

    public string Name { get; set; }
    public string Description { get; set; }

    public ICollection<Author> Authors { get; set; } = new List<Author>();
    public Publisher Publisher { get; set; }

    [Column(TypeName = "decimal(8, 2)")]
    public decimal PaperbackPrice { get; set; }
    public int PaperbackQuantity { get; set; }
    
    [Column(TypeName = "decimal(8, 2)")]
    public decimal HardcoverPrice { get; set; }
    public int HardcoverQuantity { get; set; }

    public int PrintLength { get; set; }
    public string Language { get; set; }
    public DateTime PublicationDate { get; set; }
    public string ISBN13 { get; set; }
}