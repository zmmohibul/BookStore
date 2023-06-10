using API.DTOs;
using API.Helpers;

namespace API.Interfaces;

public interface ICategoryRepository
{
    Task<ICollection<CategoryDto>> GetAllCategories();
    Task<CategoryWithSubCategoriesDto> GetCategoryById(int id);
    Task<Result<CategoryDto>> CreateCategory(CreateCategoryDto createCategoryDto);
}