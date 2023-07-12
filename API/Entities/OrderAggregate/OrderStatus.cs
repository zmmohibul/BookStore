using System.Runtime.Serialization;

namespace API.Entities.OrderAggregate;

public enum OrderStatus
{
    [EnumMember(Value = "OrderPlaced")]
    OrderPlaced,
    
    [EnumMember(Value = "OrderReceived")]
    OrderReceived,
    
    [EnumMember(Value = "OrderProcessing")]
    OrderProcessing,
    
    [EnumMember(Value = "OrderShipped")]
    OrderShipped,
    
    [EnumMember(Value = "OrderDelivered")]
    OrderDelivered,
    
    [EnumMember(Value = "OrderCancelled")]
    OrderCancelled,
}