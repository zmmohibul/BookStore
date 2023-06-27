using API.Data;
using API.DTOs.Book;
using API.Helpers;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class BooksController : BaseApiController
{
    private readonly IBookRepository _bookRepository;

    public BooksController(IBookRepository bookRepository)
    {
        _bookRepository = bookRepository;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllBooks([FromQuery] PaginationParams paginationParams, [FromQuery] QueryParameters queryParameters)
    {
        return HandleResult(await _bookRepository.GetAllBooks(paginationParams, queryParameters));
    }
    
    [HttpGet("{id}")]
    public async Task<IActionResult> GetBook(int id)
    {
        return HandleResult(await _bookRepository.GetBookById(id));
    }

    [Authorize(Policy = "RequireAdminRole")]
    [HttpPost]
    public async Task<IActionResult> CreateBook(CreateBookDto createBookDto)
    {
        var result = await _bookRepository.CreateBook(createBookDto);

        if (result.IsSuccess)
        {
            return CreatedAtAction(nameof(GetBook), new { id = result.Data.Id }, result.Data);
        }

        return HandleResult(result);
    }
    
    [Authorize(Policy = "RequireAdminRole")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteBook(int id)
    {
        return HandleResult(await _bookRepository.DeleteBook(id));
    }
    
    [Authorize(Policy = "RequireAdminRole")]
    [HttpPost("{id}/add-picture")]
    public async Task<IActionResult> AddBookPicture(int id, IFormFile file)
    {
        return HandleResult(await _bookRepository.AddBookPicture(id, file));
    }

    [Authorize(Policy = "RequireAdminRole")]
    [HttpPost("{id}/set-main-picture/{pictureId}")]
    public async Task<IActionResult> SetBookMainPicture(int id, int pictureId)
    {
        return HandleResult(await _bookRepository.SetMainBookPicture(id, pictureId));
    }
    
    [Authorize(Policy = "RequireAdminRole")]
    [HttpDelete("{id}/delete-picture/{pictureId}")]
    public async Task<IActionResult> DeleteBookPicture(int id, int pictureId)
    {
        return HandleResult(await _bookRepository.DeleteBookPicture(id, pictureId));
    }
}