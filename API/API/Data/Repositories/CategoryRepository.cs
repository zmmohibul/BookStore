using API.DTOs;
using API.DTOs.Category;
using API.Entities.BookAggregate;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Mvc;
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
    
    public async Task<ICollection<CategoryDto>> GetAllCategories()
    {
        var categories = await _dataContext.Categories
            .Where(category => category.ParentId == null)
            .AsNoTracking()
            .ProjectTo<CategoryDto>(_mapper.ConfigurationProvider)
            .ToListAsync();

        return categories;
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

    public async Task<Result<CategoryDto>> CreateCategory(CreateCategoryDto createCategoryDto)
    {
        if (await CategoryNameExist(createCategoryDto))
        {
            return new Result<CategoryDto>()
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
                .ProjectTo<CategoryDto>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();

            return new Result<CategoryDto>()
            {
                Data = data,
                IsSuccess = true,
                StatusCode = 201
            };
        }
        
        return new Result<CategoryDto>()
        {
            Data = null,
            StatusCode = 400,
            ErrorMessage = "Failed to create category",
            IsSuccess = false
        };
    }

    public async Task<Result<CategoryDto>> UpdateCategory(int id, UpdateCategoryDto updateCategoryDto)
    {
        var category = await _dataContext.Categories
            .Where(cat => cat.Id == id)
            .SingleOrDefaultAsync();
        
        if (category == null)
        {
            return NotFoundResult($"No Category found with the given id - {id} to update");
        }

        if (category.Name.Equals(updateCategoryDto.Name))
        {
            return new Result<CategoryDto>()
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
            return new Result<CategoryDto>()
            {
                Data = _mapper.Map<CategoryDto>(category),
                IsSuccess = true,
                StatusCode = 200
            };
        }
        
        return new Result<CategoryDto>()
        {
            Data = null,
            StatusCode = 400,
            ErrorMessage = "Failed to update category",
            IsSuccess = false
        };
    }
    
    public async Task<Result<CategoryDto>> DeleteCategory(int id)
    {
        var category = await _dataContext.Categories.SingleOrDefaultAsync(cat => cat.Id == id);
        if (category == null)
        {
            return NotFoundResult($"No Category found with the given id - {id} to delete");
        }

        _dataContext.Categories.Remove(category);
        
        if (await _dataContext.SaveChangesAsync() > 0)
        {
            return new Result<CategoryDto>()
            {
                Data = null,
                IsSuccess = true,
                StatusCode = 204
            };
        }
        
        return new Result<CategoryDto>()
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

    private Result<CategoryDto> NotFoundResult(string message)
    {
        return new Result<CategoryDto>()
        {
            Data = null,
            StatusCode = 404,
            ErrorMessage = message,
            IsSuccess = false
        };
    }
}