using API.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BooksController : ControllerBase
{
    private readonly DataContext _dataContext;

    public BooksController(DataContext dataContext)
    {
        _dataContext = dataContext;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllBooks()
    {
        var catId = 1;
        var books = _dataContext.Books
            .Include(book => book.Categories)
            .Where(book => book.Categories.Any(cat => cat.Id == catId));
        return Ok(await _dataContext.Books.ToListAsync());
    }
    
    [HttpGet("{id}")]
    public async Task<IActionResult> GetBook(int id)
    {
        var book = await _dataContext.Books.FindAsync(id);
        return Ok(book);
    }
}