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
    
    public async Task<Result<PaginatedList<CategoryDto>>> GetAllCategories(PaginationParams paginationParams)
    {
        var query = _dataContext.Categories
            .Where(category => category.ParentId == null)
            .AsNoTracking()
            .OrderBy(cat => cat.Name)
            .ProjectTo<CategoryDto>(_mapper.ConfigurationProvider);
        
        var data = await PaginatedList<CategoryDto>
            .CreatePaginatedListAsync(query, paginationParams.PageNumber, paginationParams.PageSize);
        
        return Result<PaginatedList<CategoryDto>>.OkResult(data);
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
            return Result<CategoryWithSubCategoriesDto>.NotFoundResult($"No category found with id: {id}");
        }
        
        return Result<CategoryWithSubCategoriesDto>.OkResult(category);
    }

    public async Task<Result<CategoryWithSubCategoriesDto>> CreateCategory(CreateCategoryDto createCategoryDto)
    {
        if (await CategoryNameExist(createCategoryDto))
        {
            return Result<CategoryWithSubCategoriesDto>.BadRequestResult("Category Name already in use");
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
                return Result<CategoryWithSubCategoriesDto>.NotFoundResult($"No Parent Category found with the given parentId - {category.ParentId}");
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
            
            return Result<CategoryWithSubCategoriesDto>.DataCreatedResult(data);
        }

        return Result<CategoryWithSubCategoriesDto>.BadRequestResult("Failed to create category");
    }

    public async Task<Result<CategoryWithSubCategoriesDto>> UpdateCategory(int id, UpdateCategoryDto updateCategoryDto)
    {
        var category = await _dataContext.Categories
            .Where(cat => cat.Id == id)
            .Include(cat => cat.SubCategories)
            .SingleOrDefaultAsync();
        
        if (category == null)
        {
            return Result<CategoryWithSubCategoriesDto>.NotFoundResult($"No Category found with the given id - {id} to update");
        }

        if (category.Name.Equals(updateCategoryDto.Name))
        {
            return Result<CategoryWithSubCategoriesDto>.BadRequestResult("Attempt to update with same name");
        }

        category.Name = updateCategoryDto.Name;
        
        if (await _dataContext.SaveChangesAsync() > 0)
        {
            return Result<CategoryWithSubCategoriesDto>.OkResult(_mapper.Map<CategoryWithSubCategoriesDto>(category));
        }
        
        return Result<CategoryWithSubCategoriesDto>.BadRequestResult("Failed to update category");
    }
    
    public async Task<Result<CategoryWithSubCategoriesDto>> DeleteCategory(int id)
    {
        var category = await _dataContext.Categories
            .Include(cat => cat.SubCategories)
            .SingleOrDefaultAsync(cat => cat.Id == id);
        if (category == null)
        {
            return Result<CategoryWithSubCategoriesDto>.NotFoundResult($"No Category found with the given id - {id} to delete");
        }

        if (category.SubCategories.Count > 0)
        {
            return Result<CategoryWithSubCategoriesDto>
                .BadRequestResult($"{category.Name} has {category.SubCategories.Count} Sub-Categories. Delete them first");
        }

        _dataContext.Categories.Remove(category);
        
        if (await _dataContext.SaveChangesAsync() > 0)
        {
            return Result<CategoryWithSubCategoriesDto>.NoContentResult();
        }
        
        return Result<CategoryWithSubCategoriesDto>
            .BadRequestResult("Failed to delete category");
    }

    private async Task<bool> CategoryNameExist(CreateCategoryDto createCategoryDto)
    {
        return await _dataContext.Categories.AnyAsync(category => category.Name.Equals(createCategoryDto.Name));
    }
}