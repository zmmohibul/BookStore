using System.ComponentModel.DataAnnotations;

namespace API.DTOs.Author;

public class CreateAuthorDto
{
    [Required] 
    public string Name { get; set; }
    
    [Required] 
    public string Bio { get; set; }
}