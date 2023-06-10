using API.DTOs;
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
    
    public async Task<ICollection<CategoryDto>> GetAllCategories()
    {
        var categories = await _dataContext.Categories
            .Where(category => category.ParentId == null)
            .AsNoTracking()
            .ProjectTo<CategoryDto>(_mapper.ConfigurationProvider)
            .ToListAsync();

        return categories;
    }

    public async Task<CategoryWithSubCategoriesDto> GetCategoryById(int id)
    {
        var category = await _dataContext.Categories
            .Where(category => category.Id == id)
            .Include(category => category.SubCategories)
            .AsNoTracking()
            .ProjectTo<CategoryWithSubCategoriesDto>(_mapper.ConfigurationProvider)
            .SingleOrDefaultAsync();

        return category;
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
                return new Result<CategoryDto>()
                {
                    Data = null,
                    StatusCode = 400,
                    ErrorMessage = "No Parent Category found with the given parentId",
                    IsSuccess = false
                };
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
            StatusCode = 500,
            ErrorMessage = "Failed to create category",
            IsSuccess = false
        };
    }

    private async Task<bool> CategoryNameExist(CreateCategoryDto createCategoryDto)
    {
        return await _dataContext.Categories.AnyAsync(category => category.Name.Equals(createCategoryDto.Name));
    }
}