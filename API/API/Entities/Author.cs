namespace API.Entities;

public class Author
{
    public int Id { get; set; }
    
    public string Name { get; set; }
    public string Bio { get; set; }
    public AuthorPicture Picture { get; set; }

    public ICollection<Book> Books { get; set; } = new List<Book>();
}