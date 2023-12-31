using System.ComponentModel.DataAnnotations;

namespace API.Entities.BookAggregate;

public class Category
{
    public int Id { get; set; }
    
    [MaxLength(100)]
    public string Name { get; set; }

    public int? ParentId { get; set; }
    public Category? Parent { get; set; }
    
    public ICollection<Category> SubCategories { get; set; } = new List<Category>();

    public ICollection<Book> Books { get; set; } = new List<Book>();

    public ICollection<Author> AuthorsWhoWroteBooksOnThisCategory { get; set; } = new List<Author>();

    public ICollection<Publisher> PublishersWhoPublishedBooksUnderThisCategory { get; set; } = new List<Publisher>();
}