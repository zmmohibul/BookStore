using API.DTOs;
using API.DTOs.Author;
using API.Entities.BookAggregate;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

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
    
    public async Task<Result<PaginatedList<AuthorDto>>> GetAllAuthors(PaginationParams paginationParams, QueryParameters queryParameters)
    {
        var query = _dataContext.Authors.AsNoTracking();

        if (!queryParameters.SearchTerm.IsNullOrEmpty())
        {
            query = query.Where(author => author.Name.ToLower().Contains(queryParameters.SearchTerm.ToLower()));
        }

        if (queryParameters.CategoryId != null)
        {
            query = query.Include(author => author.WrittenBookCategories);
            query = query.Where(author =>
                author.WrittenBookCategories.Any(category => category.Id == queryParameters.CategoryId));
        }

        query = query.OrderBy(author => author.Name);

        var projectedQuery = query.ProjectTo<AuthorDto>(_mapper.ConfigurationProvider);
        
        var data = await PaginatedList<AuthorDto>
            .CreatePaginatedListAsync(projectedQuery, paginationParams.PageNumber, paginationParams.PageSize);
        
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

    public async Task<Result<AuthorDto>> UpdateAuthor(int authorId, CreateAuthorDto createAuthorDto)
    {
        var author = await _dataContext.Authors.FindAsync(authorId);

        if (author == null)
        {
            return Result<AuthorDto>.NotFoundResult($"Author with id - {authorId} not found");
        }

        _mapper.Map(createAuthorDto, author);

        await _dataContext.SaveChangesAsync();
        
        author = await _dataContext.Authors
            .Include(auth => auth.AuthorPicture)
            .SingleOrDefaultAsync(auth => auth.Id == authorId);
        
        return Result<AuthorDto>.OkResult(_mapper.Map<AuthorDto>(author));
    }

    public async Task<Result<bool>> DeleteAuthor(int authorId)
    {
        var author = await _dataContext.Authors
            .Include(auth => auth.AuthorPicture)
            .Include(auth => auth.Books)
            .ThenInclude(book => book.Authors)
            .SingleOrDefaultAsync(auth => auth.Id == authorId);

        if (author == null)
        {
            return Result<bool>.NotFoundResult($"No author found with id {authorId}");
        }

        if (author.AuthorPicture != null)
        {
            await _pictureUploadService.DeletePhotoAsync(author.AuthorPicture.PublicId);
        }

        if (author.Books.Count > 0)
        {
            _dataContext.RemoveRange(author
                .Books.Where(book => book.Authors.Count == 1));
            
            await _dataContext.SaveChangesAsync();
        }

        _dataContext.Remove(author);

        return await _dataContext.SaveChangesAsync() > 0 
            ? Result<bool>.NoContentResult() 
            : Result<bool>.BadRequestResult("Failed to delete author");
    }

    public async Task<Result<PictureDto>> AddAuthorPicture(int authorId, IFormFile file)
    {
        var author = await _dataContext.Authors.FindAsync(authorId);

        if (author == null)
        {
            return Result<PictureDto>.NotFoundResult($"No author found with id {authorId}");
        }

        if (author.AuthorPicture != null)
        {
            await _pictureUploadService.DeletePhotoAsync(author.AuthorPicture.PublicId);
        }

        var result = await _pictureUploadService.AddPictureAsync(file);

        if (result.Error != null)
        {
            return Result<PictureDto>.BadRequestResult(result.Error.Message);
        }

        var authorPicture = new AuthorPicture()
        {
            Url = result.SecureUrl.AbsoluteUri,
            PublicId = result.PublicId,
            IsMain = true
        };

        author.AuthorPicture = authorPicture;

        return await _dataContext.SaveChangesAsync() > 0 
            ? Result<PictureDto>.OkResult(_mapper.Map<PictureDto>(authorPicture)) 
            : Result<PictureDto>.BadRequestResult("Problem adding picture");
    }

    public async Task<bool> AuthorNameExist(string authorName)
    {
        return await _dataContext.Authors.AnyAsync(author => author.Name.Equals(authorName));
    }
}