using API.DTOs;
using API.DTOs.Category;
using API.Helpers;

namespace API.Interfaces;

public interface ICategoryRepository
{
    Task<ICollection<CategoryDto>> GetAllCategories();
    Task<Result<CategoryWithSubCategoriesDto>> GetCategoryById(int id);
    Task<Result<CategoryDto>> CreateCategory(CreateCategoryDto createCategoryDto);
    Task<Result<CategoryDto>> UpdateCategory(int id, UpdateCategoryDto updateCategoryDto);
    Task<Result<CategoryDto>> DeleteCategory(int id);
}