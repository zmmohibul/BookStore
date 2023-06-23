using API.Errors;
using API.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BaseApiController : ControllerBase
{
    public IActionResult HandleResult<T>(Result<T> result)
    {
        if (result.StatusCode == 200)
        {
            return Ok(result.Data);
        }
        
        if (result.StatusCode == 204)
        {
            return NoContent();
        }

        if (result.StatusCode == 404)
        {
            return NotFound(new Error()
            {
                StatusCode = result.StatusCode,
                ErrorMessage = result.ErrorMessage
            });
        }

        return BadRequest(new Error()
        {
            StatusCode = result.StatusCode,
            ErrorMessage = result.ErrorMessage
        });
    }
}