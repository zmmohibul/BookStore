using System.ComponentModel.DataAnnotations;

namespace API.DTOs.Publisher;

public class CreatePublisherDto
{
    [Required] 
    public string Name { get; set; }
}