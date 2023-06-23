using API.DTOs;
using API.DTOs.Book;
using API.Entities.BookAggregate;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data.Repositories;

public class BookRepository : IBookRepository
{
    private readonly DataContext _dataContext;
    private readonly IPictureUploadService _pictureUploadService;
    private readonly IMapper _mapper;

    public BookRepository(DataContext dataContext, IPictureUploadService pictureUploadService, IMapper mapper)
    {
        _dataContext = dataContext;
        _pictureUploadService = pictureUploadService;
        _mapper = mapper;
    }
    
    public async Task<Result<PaginatedList<BookDto>>> GetAllBooks(PaginationParams paginationParams)
    {
        var query = _dataContext.Books
            .AsNoTracking()
            .OrderBy(book => book.Name)
            .ProjectTo<BookDto>(_mapper.ConfigurationProvider);

        var data = await PaginatedList<BookDto>
            .CreatePaginatedListAsync(query, paginationParams.PageNumber, paginationParams.PageSize);
        
        return Result<PaginatedList<BookDto>>.OkResult(data);
    }

    public async Task<Result<BookDto>> GetBookById(int id)
    {
        var book = await _dataContext.Books
            .AsNoTracking()
            .OrderBy(book => book.Name)
            .ProjectTo<BookDto>(_mapper.ConfigurationProvider)
            .SingleOrDefaultAsync(book => book.Id == id);

        if (book == null)
        {
            return Result<BookDto>.NotFoundResult($"Book with id {id} not found");
        }
        
        return Result<BookDto>.OkResult(book);
    }

    public async Task<Result<BookDto>> CreateBook(CreateBookDto createBookDto)
    {
        var book = _mapper.Map<Book>(createBookDto);
        
        var authors = await _dataContext.Authors
            .Where(auth => createBookDto.AuthorsId.Any(id => id == auth.Id))
            .Include(auth => auth.AuthorPicture)
            .ToListAsync();

        if (authors.Count == 0)
        {
            return Result<BookDto>.BadRequestResult($"Invalid author id");
        }

        foreach (var author in authors)
        {
            book.Authors.Add(author);
            author.Books.Add(book);
        }

        var categories = await _dataContext.Categories
            .Where(category => createBookDto.CategoriesId.Any(id => id == category.Id))
            .ToListAsync();

        if (categories.Count == 0)
        {
            return Result<BookDto>.BadRequestResult($"Invalid category id");
        }

        foreach (var category in categories)
        {
            book.Categories.Add(category);
            category.Books.Add(book);
        }

        var publisher = await _dataContext.Publishers
            .SingleOrDefaultAsync(pub => pub.Id == createBookDto.PublisherId);

        if (publisher == null)
        {
            return Result<BookDto>.BadRequestResult($"Invalid publisher id");
        }

        book.Publisher = publisher;
        publisher.Books.Add(book);

        return await _dataContext.SaveChangesAsync() > 0 
            ? Result<BookDto>.OkResult(_mapper.Map<BookDto>(book)) 
            : Result<BookDto>.BadRequestResult($"Could not save book...");
    }

    public async Task<Result<bool>> DeleteBook(int bookId)
    {
        var book = await _dataContext.Books
            .Include(book => book.Pictures)
            .SingleOrDefaultAsync(b => b.Id == bookId);

        if (book == null)
        {
            return Result<bool>.NotFoundResult($"No book found with given id {bookId}");
        }

        foreach (var bookPicture in book.Pictures)
        {
            await _pictureUploadService.DeletePhotoAsync(bookPicture.PublicId);
        }

        _dataContext.Remove(book);

        return await _dataContext.SaveChangesAsync() > 0
            ? Result<bool>.NoContentResult()
            : Result<bool>.BadRequestResult("Could not delete book");
    }

    public async Task<Result<PictureDto>> AddBookPicture(int bookId, IFormFile file)
    {
        var book = await _dataContext.Books
            .Include(book => book.Pictures)
            .SingleOrDefaultAsync(b => b.Id == bookId);

        if (book == null)
        {
            return Result<PictureDto>.NotFoundResult($"No book found with given id {bookId}");
        }

        var result = await _pictureUploadService.AddPictureAsync(file);

        if (result.Error != null)
        {
            return Result<PictureDto>.BadRequestResult(result.Error.Message);
        }

        var bookPicture = new BookPicture
        {
            Url = result.SecureUrl.AbsoluteUri,
            PublicId = result.PublicId,
            IsMain = book.Pictures.Count == 0
        };
        
        book.Pictures.Add(bookPicture);
        
        return await _dataContext.SaveChangesAsync() > 0 
            ? Result<PictureDto>.OkResult(_mapper.Map<PictureDto>(bookPicture)) 
            : Result<PictureDto>.BadRequestResult("Problem adding picture");
    }
}