using API.DTOs.Author;
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
}