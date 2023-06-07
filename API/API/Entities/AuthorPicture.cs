namespace API.Entities;

public class AuthorPicture
{
    public int Id { get; set; }
    public string Url { get; set; }
    public bool IsMain { get; set; }
    public string? PublicId { get; set; }

    public int AuthorId { get; set; }
    public Author Author { get; set; }
}