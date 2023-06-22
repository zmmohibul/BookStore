using API.Data;
using API.Data.Repositories;
using API.DTOs;
using API.Helpers;
using API.Interfaces;
using API.Services;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions;

public static class ApplicationServiceExtensions
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services,
        IConfiguration config)
    {
        services.AddDbContext<DataContext>(opt =>
        {
            opt.UseSqlServer(config.GetConnectionString("DefaultConnection"));
        });
        services.AddCors();
        services.Configure<CloudinarySettings>(config.GetSection("CloudinarySettings"));

        services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
        
        services.AddScoped<ITokenService, TokenService>();
        services.AddScoped<IPictureUploadService, PictureUploadService>();

        services.AddScoped<ICategoryRepository, CategoryRepository>();
        services.AddScoped<IAuthorRepository, AuthorRepository>();
        services.AddScoped<IPublisherRepository, PublisherRepository>();
        

        return services;
    }
}