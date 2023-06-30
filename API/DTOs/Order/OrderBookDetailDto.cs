using System.Text.Json.Serialization;
using API.Entities.OrderAggregate;

namespace API.DTOs.Order;

public class OrderBookDetailDto
{
    public int BookId { get; set; }
    public string BookName { get; set; }
    
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public OrderedBookType BookType { get; set; }
    
    public string PictureUrl { get; set; }
}