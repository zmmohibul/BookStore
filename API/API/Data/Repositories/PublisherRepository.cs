using API.DTOs.Publisher;
using API.Entities.BookAggregate;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data.Repositories;

public class PublisherRepository : IPublisherRepository
{
    private readonly DataContext _dataContext;
    private readonly IMapper _mapper;

    public PublisherRepository(DataContext dataContext, IMapper mapper)
    {
        _dataContext = dataContext;
        _mapper = mapper;
    }
    
    public async Task<Result<PaginatedList<PublisherDto>>> GetAllPublisher(PaginationParams paginationParams)
    {
        var query = _dataContext.Publishers
            .OrderBy(publisher => publisher.Name)
            .ProjectTo<PublisherDto>(_mapper.ConfigurationProvider);

        var data = await PaginatedList<PublisherDto>
            .CreatePaginatedListAsync(query, paginationParams.PageNumber, paginationParams.PageSize);
        
        return Result<PaginatedList<PublisherDto>>.OkResult(data);
    }

    public async Task<Result<PublisherDto>> GetPublisherById(int publisherId)
    {
        var publisher = await _dataContext.Publishers
            .SingleOrDefaultAsync(pub => pub.Id == publisherId);
        
        return Result<PublisherDto>.OkResult(_mapper.Map<PublisherDto>(publisher));
    }

    public async Task<Result<PublisherDto>> CreatePublisher(CreatePublisherDto createPublisherDto)
    {
        if (await PublisherNameExist(createPublisherDto.Name))
        {
            return Result<PublisherDto>.BadRequestResult($"Publisher Name {createPublisherDto.Name} is already in use.");
        }
        
        var publisher = _mapper.Map<Publisher>(createPublisherDto);

        _dataContext.Add(publisher);

        return await _dataContext.SaveChangesAsync() > 0 
            ? Result<PublisherDto>.DataCreatedResult(_mapper.Map<PublisherDto>(publisher)) 
            : Result<PublisherDto>.BadRequestResult($"Could not save publisher...");
    }

    public async Task<Result<bool>> DeletePublisher(int publisherId)
    {
        var publisher = await _dataContext.Publishers.FindAsync(publisherId);

        if (publisher == null)
        {
            return Result<bool>.NotFoundResult($"No publisher found by id {publisherId}");
        }

        _dataContext.Remove(publisher);
        await _dataContext.SaveChangesAsync();
        
        return Result<bool>.NoContentResult();
    }

    public async Task<bool> PublisherNameExist(string publisherName)
    {
        return await _dataContext.Publishers.AnyAsync(publisher => publisher.Name.Equals(publisherName));
    }
}