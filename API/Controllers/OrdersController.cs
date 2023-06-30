using System.Security.Claims;
using API.DTOs.Order;
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

    [HttpPost]
    public async Task<IActionResult> CreateOrder(CreateOrderDto createOrderDto)
    {
        var username = User.FindFirst(ClaimTypes.Name)?.Value;
        var result = await _orderRepository.CreateOrder(username, createOrderDto);

        return Ok(result.Data);
    }
}