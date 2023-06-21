using API.DTOs;
using API.DTOs.Author;
using API.Entities.BookAggregate;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data.Repositories;

public class AuthorRepository : IAuthorRepository
{
    private readonly DataContext _dataContext;
    private readonly IMapper _mapper;
    private readonly IPictureUploadService _pictureUploadService;

    public AuthorRepository(DataContext dataContext, IMapper mapper, IPictureUploadService pictureUploadService)
    {
        _dataContext = dataContext;
        _mapper = mapper;
        _pictureUploadService = pictureUploadService;
    }
    
    public async Task<Result<PaginatedList<AuthorDto>>> GetAllAuthors(PaginationParams paginationParams)
    {
        var query = _dataContext.Authors
            .AsNoTracking()
            .OrderBy(author => author.Name)
            .ProjectTo<AuthorDto>(_mapper.ConfigurationProvider);
        
        
        var data = await PaginatedList<AuthorDto>
            .CreatePaginatedListAsync(query, paginationParams.PageNumber, paginationParams.PageSize);
        
        return Result<PaginatedList<AuthorDto>>.OkResult(data);
    }

    public async Task<Result<AuthorDto>> GetAuthorById(int authorId)
    {
        var author = await _dataContext.Authors
            .Include(author => author.AuthorPicture)
            .SingleOrDefaultAsync(author => author.Id == authorId);

        if (author == null)
        {
            return Result<AuthorDto>.NotFoundResult($"No author found with id {authorId}");
        }
        
        return Result<AuthorDto>.OkResult(_mapper.Map<AuthorDto>(author));
    }
    
    public async Task<Result<AuthorDto>> CreateAuthor(CreateAuthorDto createAuthorDto)
    {
        if (await AuthorNameExist(createAuthorDto.Name))
        {
            return Result<AuthorDto>.BadRequestResult($"The author name {createAuthorDto.Name} is already in use");
        }
        
        var author = _mapper.Map<Author>(createAuthorDto);
        _dataContext.Authors.Add(author);

        if (!(await _dataContext.SaveChangesAsync() > 0))
        {
            return Result<AuthorDto>.BadRequestResult($"Could not save author to db.");
        }
        
        return Result<AuthorDto>.DataCreatedResult(_mapper.Map<AuthorDto>(author));
    }

    public async Task<Result<PictureDto>> AddAuthorPicture(int authorId, IFormFile file)
    {
        var author = await _dataContext.Authors.FindAsync(authorId);

        if (author == null)
        {
            return new Result<PictureDto>()
            {
                IsSuccess = false,
                StatusCode = 404,
                ErrorMessage = $"No author found with id {authorId}"
            };
        }

        if (author.AuthorPicture != null)
        {
            await _pictureUploadService.DeletePhotoAsync(author.AuthorPicture.PublicId);
        }

        var result = await _pictureUploadService.AddPictureAsync(file);

        if (result.Error != null)
        {
            return new Result<PictureDto>()
            {
                IsSuccess = false,
                StatusCode = 400,
                ErrorMessage = result.Error.Message
            };
        }

        var authorPicture = new AuthorPicture()
        {
            Url = result.SecureUrl.AbsoluteUri,
            PublicId = result.PublicId,
            IsMain = true
        };

        author.AuthorPicture = authorPicture;

        if (await _dataContext.SaveChangesAsync() > 0)
        {
            return new Result<PictureDto>()
            {
                Data = _mapper.Map<PictureDto>(authorPicture),
                StatusCode = 200,
                IsSuccess = true
            };
        }

        return new Result<PictureDto>()
        {
            IsSuccess = false,
            StatusCode = 400,
            ErrorMessage = "Problem adding picture"
        };
    }

    public async Task<bool> AuthorNameExist(string authorName)
    {
        return await _dataContext.Authors.AnyAsync(author => author.Name.Equals(authorName));
    }
}