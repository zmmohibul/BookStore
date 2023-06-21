using API.DTOs.Author;
using API.Helpers;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class AuthorsController : BaseApiController
{
    private readonly IAuthorRepository _authorRepository;

    public AuthorsController(IAuthorRepository authorRepository)
    {
        _authorRepository = authorRepository;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllAuthors([FromQuery] PaginationParams paginationParams)
    {
        return HandleResult(await _authorRepository.GetAllAuthors(paginationParams));
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetAuthorById(int id)
    {
        return HandleResult(await _authorRepository.GetAuthorById(id));
    }

    [HttpPost]
    public async Task<IActionResult> CreateAuthor(CreateAuthorDto createAuthorDto)
    {
        var result = await _authorRepository.CreateAuthor(createAuthorDto);

        if (result.IsSuccess)
        {
            return Ok(result.Data);
        }

        return HandleResult(result);
    }

    [HttpPost("{id}/add-picture")]
    public async Task<IActionResult> AddAuthorPicture(int id, IFormFile file)
    {
        return HandleResult(await _authorRepository.AddAuthorPicture(id, file));
    }
}