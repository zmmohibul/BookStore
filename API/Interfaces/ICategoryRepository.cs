using API.DTOs.Category;
using API.Helpers;

namespace API.Interfaces;

public interface ICategoryRepository
{
    Task<Result<PaginatedList<CategoryDto>>> GetAllCategories(PaginationParams paginationParams,
        QueryParameters queryParameters, int? parentId = null);
    Task<Result<CategoryWithSubCategoriesDto>> GetCategoryById(int id);
    Task<Result<CategoryWithSubCategoriesDto>> CreateCategory(CreateCategoryDto createCategoryDto);
    Task<Result<CategoryWithSubCategoriesDto>> UpdateCategory(int id, UpdateCategoryDto updateCategoryDto);
    Task<Result<CategoryWithSubCategoriesDto>> DeleteCategory(int id);
}