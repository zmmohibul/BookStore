namespace API.Entities;

public class Category
{
    public int Id { get; set; }
    public string Name { get; set; }

    public int? ParentId { get; set; }
    public Category? Parent { get; set; }
    
    public ICollection<Category> SubCategories { get; set; } = new List<Category>();

    public ICollection<Book> Books { get; set; } = new List<Book>();
}