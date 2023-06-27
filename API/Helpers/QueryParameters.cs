namespace API.Helpers;

public class QueryParameters
{
    public string? SearchTerm { get; set; }
    public int? CategoryId { get; set; }
    public ICollection<int> AuthorsId { get; set; } = new List<int>();
}