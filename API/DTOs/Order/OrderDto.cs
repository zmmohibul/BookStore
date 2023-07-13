using System.Text.Json.Serialization;
using API.DTOs.Account;
using API.Entities.OrderAggregate;

namespace API.DTOs.Order;

public class OrderDto
{
    public int Id { get; set; }
    public ICollection<OrderItemDto> OrderedBooks { get; set; } = new List<OrderItemDto>();
    public decimal Subtotal { get; set; }
    public DateTime OrderDate { get; set; }
    
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public OrderStatus OrderStatus { get; set; }

    public UserDetailDto OrderedByUser { get; set; }
    public AddressDto UserAddress { get; set; }
}