using API.DTOs;
using API.DTOs.Author;
using API.DTOs.Book;
using API.DTOs.Category;
using API.DTOs.Publisher;
using API.Entities.BookAggregate;
using AutoMapper;

namespace API.Helpers;

public class AutoMapperProfiles : Profile
{
    public AutoMapperProfiles()
    {
        CreateMap<CreateBookDto, Book>();
        CreateMap<Book, BookDto>();
        CreateMap<BookPicture, PictureDto>();
        
        CreateMap<CreateAuthorDto, Author>();
        CreateMap<Author, AuthorDto>()
            .ForMember(dest => dest.PictureUrl,
                opt => opt.MapFrom(
                    src => src.AuthorPicture.Url));
        CreateMap<AuthorPicture, PictureDto>();

        CreateMap<Publisher, PublisherDto>();
        CreateMap<CreatePublisherDto, Publisher>();
        
        CreateMap<Category, CategoryDto>()
            .ForMember(dest => dest.SubCategoryCount,
                opt => opt.MapFrom(
                    src => src.SubCategories.Count));
        CreateMap<Category, CategoryWithSubCategoriesDto>()
            .ForMember(dest => dest.SubCategories,
                opt => opt.MapFrom(
                    src => src.SubCategories));
    }
}