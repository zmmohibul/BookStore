using System.Security.Claims;
using API.DTOs.Order;
using API.Helpers;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Authorize]
public class OrdersController : BaseApiController
{
    private readonly IOrderRepository _orderRepository;

    public OrdersController(IOrderRepository orderRepository)
    {
        _orderRepository = orderRepository;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllOrders([FromQuery] PaginationParams paginationParams, [FromQuery] QueryParameters queryParameters)
    {
        var result = await _orderRepository.GetAllOrders(User.FindFirst(ClaimTypes.Name)?.Value, paginationParams, queryParameters);
        return HandleResult(result);
    }

    [HttpPost]
    public async Task<IActionResult> CreateOrder(CreateOrderDto createOrderDto)
    {
        var result = await _orderRepository.CreateOrder(User.FindFirst(ClaimTypes.Name)?.Value, createOrderDto);

        if (result.StatusCode != 201)
        {
            return HandleResult(result);
        }

        return Ok(result.Data);
    }
}