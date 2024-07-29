using API.DTOs;
using API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace API.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    /*
        - api/account
    */
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;
        public AccountController(UserManager<AppUser> userManager,
                                RoleManager<IdentityRole> role
                                , IConfiguration configuration)
        {
            this._userManager = userManager;
            this._roleManager = role;
            this._configuration = configuration;
        }


        /*
            - api/account/register
        */
        [HttpPost("register")]
        public async Task<ActionResult<string>> Register(RegisterDTO registerDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var user = new AppUser
            {
                Email = registerDTO.Email,
                FullName = registerDTO.FullName,
                UserName = registerDTO.Email
            };

            var Result = await _userManager.CreateAsync(user, registerDTO.Password);
            if (!Result.Succeeded)
            {
                return BadRequest(Result.Errors);
            }

            if (registerDTO.Roles is null)
            {
                await _userManager.AddToRoleAsync(user, "User");
            }
            else
            {
                foreach (var role in registerDTO.Roles)
                {
                    await _userManager.AddToRoleAsync(user, role);
                }
            }

            return Ok(new AuthResponseDto
            {
                IsSuccess = true,
                Message = "Account Created Successfully"

            });

        }



    }
}