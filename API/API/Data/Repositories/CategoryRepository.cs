using API.DTOs;
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
}