using API.DTOs;
using API.Helpers;

namespace API.Interfaces;

public interface ICategoryRepository
{
    Task<ICollection<CategoryDto>> GetAllCategories();
    Task<Result<CategoryWithSubCategoriesDto>> GetCategoryById(int id);
    Task<Result<CategoryDto>> CreateCategory(CreateCategoryDto createCategoryDto);
}