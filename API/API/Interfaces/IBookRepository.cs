using API.DTOs;
using API.DTOs.Book;
using API.Helpers;

namespace API.Interfaces;

public interface IBookRepository
{
    Task<Result<PaginatedList<BookDto>>> GetAllBooks(PaginationParams paginationParams);
    Task<Result<BookDto>> GetBookById(int id);
    Task<Result<BookDto>> CreateBook(CreateBookDto createBookDto);
    Task<Result<bool>> DeleteBook(int bookId);
    Task<Result<PictureDto>> AddBookPicture(int bookId, IFormFile file);
}