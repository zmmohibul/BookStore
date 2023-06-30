using API.Entities.OrderAggregate;
using Microsoft.AspNetCore.Identity;

namespace API.Entities.Identity;

public class User : IdentityUser
{
    public string FirstName { get; set; }
    public string LastName { get; set; }

    public ICollection<Address> Addresses { get; set; } = new List<Address>();

    public ICollection<Order> Orders { get; set; } = new List<Order>();
}