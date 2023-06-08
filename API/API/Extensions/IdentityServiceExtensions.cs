using API.Data;
using API.Entities;
using API.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace API.Extensions;

public static class IdentityServiceExtensions
{
    public static IServiceCollection AddIdentityServices(this IServiceCollection services,
        IConfiguration config)
    {
        services.AddIdentityCore<User>(opt => { opt.Password.RequireNonAlphanumeric = false; })
            .AddRoles<AppRole>()
            .AddRoleManager<RoleManager<AppRole>>()
            .AddEntityFrameworkStores<DataContext>();
        
        services.AddAuthorization(opt => 
        {
            opt.AddPolicy("RequireAdminRole", policy => policy.RequireRole("Admin"));
        });

        return services;
    }
}