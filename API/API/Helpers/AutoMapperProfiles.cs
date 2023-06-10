using API.DTOs.Category;
using API.Entities.BookAggregate;
using AutoMapper;

namespace API.Helpers;

public class AutoMapperProfiles : Profile
{
    public AutoMapperProfiles()
    {
        CreateMap<Category, CategoryDto>();
        CreateMap<Category, CategoryWithSubCategoriesDto>()
            .ForMember(dest => dest.SubCategories,
                opt => opt.MapFrom(src => src.SubCategories));
    }
}