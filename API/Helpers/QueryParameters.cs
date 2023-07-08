using System.Text.Json.Serialization;
using API.Entities.OrderAggregate;

namespace API.Helpers;

public class QueryParameters
{
    public string? SearchTerm { get; set; }
    public int? CategoryId { get; set; }
    public ICollection<int> AuthorsId { get; set; } = new List<int>();
    public ICollection<int> PublishersId { get; set; } = new List<int>();
    
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public OrderStatus? OrderStatus { get; set; }
}