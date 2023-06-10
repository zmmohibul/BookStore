using API.DTOs;

namespace API.Interfaces;

public interface ICategoryRepository
{
    Task<ICollection<CategoryDto>> GetAllCategories();
    Task<CategoryWithSubCategoriesDto> GetCategoryById(int id);
}