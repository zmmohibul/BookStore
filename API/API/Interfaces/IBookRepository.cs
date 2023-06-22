using API.DTOs.Book;
using API.Helpers;

namespace API.Interfaces;

public interface IBookRepository
{
    Task<Result<PaginatedList<BookDto>>> GetAllBooks(PaginationParams paginationParams);
    Task<Result<BookDto>> GetBookById(int id);
    Task<Result<BookDto>> CreateBook(CreateBookDto createBookDto);
}