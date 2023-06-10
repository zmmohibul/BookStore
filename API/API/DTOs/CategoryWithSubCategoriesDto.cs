using API.Entities.BookAggregate;

namespace API.DTOs;

public class CategoryWithSubCategoriesDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int? ParentId { get; set; }
    public ICollection<CategoryDto> SubCategories { get; set; } = new List<CategoryDto>();
}