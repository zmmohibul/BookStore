using API.DTOs.Author;
using API.Helpers;

namespace API.Interfaces;

public interface IAuthorRepository
{
    Task<Result<AuthorDto>> CreateAuthor(CreateAuthorDto createAuthorDto);
}