using API.DTOs.Author;
using API.Entities.BookAggregate;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Data.Repositories;

public class AuthorRepository : IAuthorRepository
{
    private readonly DataContext _dataContext;
    private readonly IMapper _mapper;

    public AuthorRepository(DataContext dataContext, IMapper mapper)
    {
        _dataContext = dataContext;
        _mapper = mapper;
    }
    
    public async Task<Result<AuthorDto>> CreateAuthor(CreateAuthorDto createAuthorDto)
    {
        if (await AuthorNameExist(createAuthorDto.Name))
        {
            return new Result<AuthorDto>()
            {
                StatusCode = 400,
                IsSuccess = false,
                ErrorMessage = $"The author name {createAuthorDto.Name} is already in use"
            };
        }
        
        var author = _mapper.Map<Author>(createAuthorDto);
        _dataContext.Authors.Add(author);

        if (!(await _dataContext.SaveChangesAsync() > 0))
        {
            return new Result<AuthorDto>()
            {
                StatusCode = 400,
                IsSuccess = false,
                ErrorMessage = $"Something went wrong. Could not save author to db."
            };
        }

        return new Result<AuthorDto>()
        {
            Data = _mapper.Map<AuthorDto>(author),
            IsSuccess = true,
            StatusCode = 201
        };

    }

    public async Task<bool> AuthorNameExist(string authorName)
    {
        return await _dataContext.Authors.AnyAsync(author => author.Name.Equals(authorName));
    }
}