using API.Data;
using API.DTOs.Book;
using API.Helpers;
using API.Interfaces;
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
    public async Task<IActionResult> GetAllBooks([FromQuery] PaginationParams paginationParams)
    {
        return HandleResult(await _bookRepository.GetAllBooks(paginationParams));
    }
    
    [HttpGet("{id}")]
    public async Task<IActionResult> GetBook(int id)
    {
        return HandleResult(await _bookRepository.GetBookById(id));
    }

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
}