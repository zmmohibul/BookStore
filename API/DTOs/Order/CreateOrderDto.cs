namespace API.DTOs.Order;

public class CreateOrderDto
{
    public ICollection<CreateOrderBookItemDto> OrderBookItems { get; set; } = new List<CreateOrderBookItemDto>();
}