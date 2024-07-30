using API.DTOs;
using API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RolesController : ControllerBase
    {
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly UserManager<AppUser> _userManager;
        public RolesController(RoleManager<IdentityRole> roleManager, UserManager<AppUser> userManager)
        {
            this._roleManager = roleManager;
            this._userManager = userManager;
        }


        [HttpPost]
        public async Task<IActionResult> CreateRole([FromBody] CreateRoleDto createRoleDto)
        {
            if (string.IsNullOrEmpty(createRoleDto.RoleName))
            {
                return BadRequest("Role Name Is Required");
            }

            var RoleExist = await _roleManager.RoleExistsAsync(createRoleDto.RoleName);

            if (RoleExist)
            {
                return BadRequest("Role Already Exist");
            }
            var RoleResult = await _roleManager.CreateAsync(new IdentityRole(createRoleDto.RoleName));

            if (RoleResult.Succeeded)
            {
                return Ok(new { message = "Role Created Successfully." });
            }
            return BadRequest("Role Creation Failed.");
        }
    
    
        
    
    }
}