using API.DTOs;
using API.DTOs.Author;
using API.Helpers;

namespace API.Interfaces;

public interface IAuthorRepository
{
    Task<Result<PaginatedList<AuthorDto>>> GetAllAuthors(PaginationParams paginationParams);
    Task<Result<AuthorDto>> GetAuthorById(int authorId);
    Task<Result<AuthorDto>> CreateAuthor(CreateAuthorDto createAuthorDto);
    Task<Result<PictureDto>> AddAuthorPicture(int authorId, IFormFile file);
}