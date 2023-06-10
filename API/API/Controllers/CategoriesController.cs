using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController : ControllerBase
{
    private readonly ICategoryRepository _categoryRepository;

    public CategoriesController(ICategoryRepository categoryRepository)
    {
        _categoryRepository = categoryRepository;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllCategories()
    {
        return Ok(await _categoryRepository.GetAllCategories());
    }
    
    [HttpGet("{id}")]
    public async Task<IActionResult> GetCategory(int id)
    {
        return Ok(await _categoryRepository.GetCategoryById(id));
    }
}