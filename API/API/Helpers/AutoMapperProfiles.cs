using API.DTOs;
using API.DTOs.Author;
using API.DTOs.Category;
using API.Entities.BookAggregate;
using AutoMapper;

namespace API.Helpers;

public class AutoMapperProfiles : Profile
{
    public AutoMapperProfiles()
    {
        CreateMap<CreateAuthorDto, Author>();
        CreateMap<Author, AuthorDto>()
            .ForMember(dest => dest.PictureUrl,
                opt => opt.MapFrom(
                    src => src.AuthorPicture.Url));
        CreateMap<AuthorPicture, PictureDto>();
        
        CreateMap<Category, CategoryDto>();
        CreateMap<Category, CategoryWithSubCategoriesDto>()
            .ForMember(dest => dest.SubCategories,
                opt => opt.MapFrom(
                    src => src.SubCategories));
    }
}