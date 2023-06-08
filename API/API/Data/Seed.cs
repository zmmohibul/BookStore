using API.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class Seed
{
    public static async Task SeedUsers(UserManager<User> userManager,
        RoleManager<IdentityRole> roleManager)
    {
        if (await userManager.Users.AnyAsync())
        {
            return;
        }

        var roles = new List<IdentityRole>()
        {
            new IdentityRole { Name = UserRoles.User.ToString() },
            new IdentityRole { Name = UserRoles.Admin.ToString() }
        };

        foreach (var role in roles)
        {
            await roleManager.CreateAsync(role);
        }

        var users = new List<User>
        {
            new User
            {
                UserName = "mohib",
                FirstName = "Mohibul",
                LastName = "Islam",
                Addresses = new List<Address>
                {
                    new Address
                    {
                        Street = "852, East Shewrapara",
                        Province = "Kafrul",
                        City = "Dhaka",
                        ZipCode = "1216",
                    }
                }
            },
            
            new User
            {
                UserName = "hamid",
                FirstName = "Hamidul",
                LastName = "Islam",
                Addresses = new List<Address>
                {
                    new Address
                    {
                        Street = "492, West Shewrapara",
                        Province = "Kafrul",
                        City = "Dhaka",
                        ZipCode = "1216",
                    }
                }
            }
        };

        await userManager.CreateAsync(users[0], "Pa$$w0rd");
        await userManager.AddToRoleAsync(users[0], UserRoles.User.ToString());
        
        await userManager.CreateAsync(users[1], "Pa$$w0rd");
        await userManager.AddToRoleAsync(users[1], UserRoles.Admin.ToString());
    }
}