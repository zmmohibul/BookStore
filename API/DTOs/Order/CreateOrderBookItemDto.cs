using System.Text.Json.Serialization;
using API.Entities.OrderAggregate;

namespace API.DTOs.Order;

public class CreateOrderBookItemDto
{
    public int BookId { get; set; }
    public int Quantity { get; set; }
    
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public OrderedBookType BookType { get; set; }
}