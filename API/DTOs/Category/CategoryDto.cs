namespace API.DTOs.Category;

public class CategoryDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int SubCategoryCount { get; set; } = 0;
}