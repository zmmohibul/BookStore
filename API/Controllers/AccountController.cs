using System.Security.Claims;
using API.DTOs;
using API.DTOs.Account;
using API.Entities.Identity;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AccountController : ControllerBase
{
    private readonly UserManager<User> _userManager;
    private readonly ITokenService _tokenService;
    private readonly IMapper _mapper;

    public AccountController(UserManager<User> userManager, ITokenService tokenService, IMapper mapper)
    {
        _userManager = userManager;
        _tokenService = tokenService;
        _mapper = mapper;
    }

    [Authorize(Policy = "RequireAdminRole")]
    [HttpGet("users-with-roles-admin")]
    public IActionResult Secret()
    {
        return Ok("Secret...");
    }
    
    [HttpGet("users-with-roles-user")]
    public IActionResult NotSecret()
    {
        return Ok("Not Secret...");
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto loginDto)
    {
        var user = await _userManager.Users
            .SingleOrDefaultAsync(user => user.UserName.Equals(loginDto.UserName));

        if (user == null)
        {
            return Unauthorized("Invalid UserName");
        }

        var result = await _userManager.CheckPasswordAsync(user, loginDto.Password);

        if (!result)
        {
            return Unauthorized("Invalid Password");
        }
        
        var roles = await _userManager.GetRolesAsync(user);

        return Ok(new UserDto
        {
            UserName = user.UserName,
            Role = roles[0],
            Token = await _tokenService.CreateToken(user)
        });
    }
    
    [Authorize]
    [HttpGet("current-user-detail")]
    public async Task<IActionResult> GetCurrentUser()
    {
        var username = User.FindFirst(ClaimTypes.Name)?.Value;
        
        var user = await _userManager.Users
            .Include(u => u.Addresses)
            .ProjectTo<UserDetailDto>(_mapper.ConfigurationProvider)
            .SingleOrDefaultAsync(user => user.UserName.Equals(username));

        return Ok(user);
    }
}