using CloudinaryDotNet.Actions;

namespace API.Interfaces;

public interface IPictureUploadService
{
    Task<ImageUploadResult> AddPictureAsync(IFormFile file);
    Task<DeletionResult> DeletePhotoAsync(string publicId);
}