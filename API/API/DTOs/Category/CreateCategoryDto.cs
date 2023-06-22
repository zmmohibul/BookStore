using System.ComponentModel.DataAnnotations;

namespace API.DTOs.Category;

public class CreateCategoryDto
{
    [Required] 
    public string Name { get; set; }
    public int? ParentId { get; set; }
}