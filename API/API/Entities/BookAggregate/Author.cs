using System.ComponentModel.DataAnnotations;

namespace API.Entities.BookAggregate;

public class Author
{
    public int Id { get; set; }
    
    [MaxLength(200)]
    public string Name { get; set; }
    public string Bio { get; set; }

    public int AuthorPictureId { get; set; }
    public AuthorPicture AuthorPicture { get; set; }

    public ICollection<Book> Books { get; set; } = new List<Book>();
}