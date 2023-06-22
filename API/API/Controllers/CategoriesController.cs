using API.DTOs.Category;
using API.Helpers;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class CategoriesController : BaseApiController
{
    private readonly ICategoryRepository _categoryRepository;

    public CategoriesController(ICategoryRepository categoryRepository)
    {
        _categoryRepository = categoryRepository;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllCategories([FromQuery] PaginationParams paginationParams, [FromQuery] QueryParameters queryParameters)
    {
        return HandleResult(await _categoryRepository.GetAllCategories(paginationParams, queryParameters));
    }
    
    [HttpGet("{id}")]
    public async Task<IActionResult> GetCategory(int id)
    {
        return HandleResult(await _categoryRepository.GetCategoryById(id));
    }
    
    [HttpGet("{id}/sub-categories")]
    public async Task<IActionResult> GetSubCategories(int id, [FromQuery] PaginationParams paginationParams, [FromQuery] QueryParameters queryParameters)
    {
        return HandleResult(await _categoryRepository.GetAllCategories(paginationParams, queryParameters, id));
    }

    [HttpPost]
    public async Task<IActionResult> CreateCategory(CreateCategoryDto createCategoryDto)
    {
        var result = await _categoryRepository.CreateCategory(createCategoryDto);

        if (result.IsSuccess)
        {
            return CreatedAtAction(nameof(GetCategory), new { id = result.Data.Id }, result.Data);
        }

        return HandleResult(result);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateCategory(int id, [FromBody]UpdateCategoryDto updateCategoryDto)
    {
        return HandleResult(await _categoryRepository.UpdateCategory(id, updateCategoryDto));
    }
    
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCategory(int id)
    {
        return HandleResult(await _categoryRepository.DeleteCategory(id));
    }
}