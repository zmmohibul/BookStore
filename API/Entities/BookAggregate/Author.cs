using System.ComponentModel.DataAnnotations;

namespace API.Entities.BookAggregate;

public class Author
{
    public int Id { get; set; }
    
    [MaxLength(200)]
    public string Name { get; set; }
    public string Bio { get; set; }

    public int? AuthorPictureId { get; set; }
    public AuthorPicture? AuthorPicture { get; set; }

    public ICollection<Book> Books { get; set; } = new List<Book>();

    public ICollection<Category> WrittenBookCategories { get; set; } = new List<Category>();

    public ICollection<Publisher> PublishersWithWhomBooksArePublished { get; set; } = new List<Publisher>();
}