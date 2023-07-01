using API.DTOs.Order;
using API.Entities.OrderAggregate;
using API.Helpers;

namespace API.Interfaces;

public interface IOrderRepository
{
    Task<Result<PaginatedList<OrderDto>>> GetAllOrders(string username);
    Task<Result<OrderDto>> GetAllOrderById(string username, int orderId);
    Task<Result<OrderDto>> CreateOrder(string username, CreateOrderDto createOrderDto);
    Task<Result<OrderDto>> UpdateOrder(string username, int orderId, UpdateOrderDto updateOrderDto);
}