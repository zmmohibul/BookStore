namespace API.DTOs.Order;

public class OrderItemDto
{
    public OrderBookDetailDto BookDetails { get; set; }
    public int Quantity { get; set; }
    public decimal Price { get; set; }
}