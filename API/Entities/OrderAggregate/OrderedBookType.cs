using System.ComponentModel;
using System.Runtime.Serialization;

namespace API.Entities.OrderAggregate;

public enum OrderedBookType
{
    [EnumMember(Value = "Paperback")]
    Paperback,
    
    [EnumMember(Value = "Hardcover")]
    Hardcover,
}