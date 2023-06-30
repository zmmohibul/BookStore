using System.Runtime.Serialization;

namespace API.Entities.OrderAggregate;

public enum OrderStatus
{
    [EnumMember(Value = "OrderReceived")]
    OrderReceived,
    
    [EnumMember(Value = "Processing")]
    Processing,
    
    [EnumMember(Value = "Shipped")]
    Shipped,
    
    [EnumMember(Value = "Delivered")]
    Delivered,
    
    [EnumMember(Value = "Cancelled")]
    Cancelled,
}