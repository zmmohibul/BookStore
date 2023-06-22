using API.DTOs.Publisher;
using API.Entities.BookAggregate;
using API.Helpers;

namespace API.Interfaces;

public interface IPublisherRepository
{
    Task<Result<PaginatedList<PublisherDto>>> GetAllPublisher(PaginationParams paginationParams, QueryParameters queryParameters);
    Task<Result<PublisherDto>> GetPublisherById(int publisherId);
    Task<Result<PublisherDto>> CreatePublisher(CreatePublisherDto createPublisherDto);
    Task<Result<bool>> DeletePublisher(int publisherId);
}