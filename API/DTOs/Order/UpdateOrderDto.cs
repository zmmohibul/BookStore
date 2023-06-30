using API.Entities.OrderAggregate;

namespace API.DTOs.Order;

public class UpdateOrderDto
{
    public int OrderId { get; set; }
    public ICollection<CreateOrderBookItemDto>? OrderBookDtos { get; set; }
    public OrderStatus? OrderStatus { get; set; }
}