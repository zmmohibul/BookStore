namespace API.Entities;

public class BookPicture
{
    public int Id { get; set; }
    public string Url { get; set; }
    public bool IsMain { get; set; }
    public string? PublicId { get; set; }

    public int BookId { get; set; }
    public Book Book { get; set; }
}