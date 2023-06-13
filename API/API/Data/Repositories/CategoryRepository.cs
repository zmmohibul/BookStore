using API.DTOs.Category;
using API.Entities.BookAggregate;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data.Repositories;

public class CategoryRepository : ICategoryRepository
{
    private readonly DataContext _dataContext;
    private readonly IMapper _mapper;

    public CategoryRepository(DataContext dataContext, IMapper mapper)
    {
        _dataContext = dataContext;
        _mapper = mapper;
    }
    
    public async Task<PaginatedList<CategoryDto>> GetAllCategories(PaginationParams paginationParams)
    {
        var query = _dataContext.Categories
            .Where(category => category.ParentId == null)
            .AsNoTracking()
            .ProjectTo<CategoryDto>(_mapper.ConfigurationProvider);
        
        
        return await PaginatedList<CategoryDto>.CreatePaginatedListAsync(query, paginationParams.PageNumber, paginationParams.PageSize);
    }

    public async Task<Result<CategoryWithSubCategoriesDto>> GetCategoryById(int id)
    {
        var category = await _dataContext.Categories
            .Where(category => category.Id == id)
            .Include(category => category.SubCategories)
            .AsNoTracking()
            .ProjectTo<CategoryWithSubCategoriesDto>(_mapper.ConfigurationProvider)
            .SingleOrDefaultAsync();

        if (category == null)
        {
            return new Result<CategoryWithSubCategoriesDto>()
            {
                IsSuccess = false,
                StatusCode = 404,
                ErrorMessage = "No category found with the given id"
            };
        }

        return new Result<CategoryWithSubCategoriesDto>()
        {
            IsSuccess = true,
            Data = category,
            StatusCode = 200
        };
    }

    public async Task<Result<CategoryWithSubCategoriesDto>> CreateCategory(CreateCategoryDto createCategoryDto)
    {
        if (await CategoryNameExist(createCategoryDto))
        {
            return new Result<CategoryWithSubCategoriesDto>()
            {
                Data = null,
                StatusCode = 400,
                ErrorMessage = "Category Name already in use",
                IsSuccess = false
            };
        }
        
        var category = new Category()
        {
            Name = createCategoryDto.Name
        };

        if (createCategoryDto.ParentId != null)
        {
            var parentCategory = await _dataContext.Categories.FindAsync(createCategoryDto.ParentId);
            if (parentCategory == null)
            {
                return NotFoundResult($"No Parent Category found with the given parentId - {category.ParentId}");
            }
            category.Parent = parentCategory;
        }

        _dataContext.Categories.Add(category);

        if (await _dataContext.SaveChangesAsync() > 0)
        { 
            var data = await _dataContext.Categories
                .Where(cat => cat.Name.Equals(createCategoryDto.Name))
                .Include(cat => cat.SubCategories)
                .ProjectTo<CategoryWithSubCategoriesDto>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();

            return new Result<CategoryWithSubCategoriesDto>()
            {
                Data = data,
                IsSuccess = true,
                StatusCode = 201
            };
        }
        
        return new Result<CategoryWithSubCategoriesDto>()
        {
            Data = null,
            StatusCode = 400,
            ErrorMessage = "Failed to create category",
            IsSuccess = false
        };
    }

    public async Task<Result<CategoryWithSubCategoriesDto>> UpdateCategory(int id, UpdateCategoryDto updateCategoryDto)
    {
        var category = await _dataContext.Categories
            .Where(cat => cat.Id == id)
            .Include(cat => cat.SubCategories)
            .SingleOrDefaultAsync();
        
        if (category == null)
        {
            return NotFoundResult($"No Category found with the given id - {id} to update");
        }

        if (category.Name.Equals(updateCategoryDto.Name))
        {
            return new Result<CategoryWithSubCategoriesDto>()
            {
                Data = null,
                StatusCode = 400,
                ErrorMessage = "Attempt to update with same name",
                IsSuccess = false
            };
        }

        category.Name = updateCategoryDto.Name;
        
        if (await _dataContext.SaveChangesAsync() > 0)
        {
            return new Result<CategoryWithSubCategoriesDto>()
            {
                Data = _mapper.Map<CategoryWithSubCategoriesDto>(category),
                IsSuccess = true,
                StatusCode = 200
            };
        }
        
        return new Result<CategoryWithSubCategoriesDto>()
        {
            Data = null,
            StatusCode = 400,
            ErrorMessage = "Failed to update category",
            IsSuccess = false
        };
    }
    
    public async Task<Result<CategoryWithSubCategoriesDto>> DeleteCategory(int id)
    {
        var category = await _dataContext.Categories.SingleOrDefaultAsync(cat => cat.Id == id);
        if (category == null)
        {
            return NotFoundResult($"No Category found with the given id - {id} to delete");
        }

        _dataContext.Categories.Remove(category);
        
        if (await _dataContext.SaveChangesAsync() > 0)
        {
            return new Result<CategoryWithSubCategoriesDto>()
            {
                Data = null,
                IsSuccess = true,
                StatusCode = 204
            };
        }
        
        return new Result<CategoryWithSubCategoriesDto>()
        {
            Data = null,
            StatusCode = 400,
            ErrorMessage = "Failed to delete category",
            IsSuccess = false
        };
    }

    private async Task<bool> CategoryNameExist(CreateCategoryDto createCategoryDto)
    {
        return await _dataContext.Categories.AnyAsync(category => category.Name.Equals(createCategoryDto.Name));
    }

    private Result<CategoryWithSubCategoriesDto> NotFoundResult(string message)
    {
        return new Result<CategoryWithSubCategoriesDto>()
        {
            Data = null,
            StatusCode = 404,
            ErrorMessage = message,
            IsSuccess = false
        };
    }
}