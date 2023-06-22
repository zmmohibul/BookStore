using API.DTOs.Publisher;
using API.Helpers;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class PublishersController : BaseApiController
{
    private readonly IPublisherRepository _publisherRepository;

    public PublishersController(IPublisherRepository publisherRepository)
    {
        _publisherRepository = publisherRepository;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllPublishers([FromQuery] PaginationParams paginationParams, [FromQuery] QueryParameters queryParameters)
    {
        return HandleResult(await _publisherRepository.GetAllPublisher(paginationParams, queryParameters));
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetPublisher(int id)
    {
        return HandleResult(await _publisherRepository.GetPublisherById(id));
    }

    [HttpPost]
    public async Task<IActionResult> CreatePublisher(CreatePublisherDto createPublisherDto)
    {
        var result = await _publisherRepository.CreatePublisher(createPublisherDto);

        if (result.IsSuccess)
        {
            return CreatedAtAction(nameof(GetPublisher), new { id = result.Data.Id }, result.Data);
        }

        return HandleResult(result);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePublisher(int id)
    {
        return HandleResult(await _publisherRepository.DeletePublisher(id));
    }
}