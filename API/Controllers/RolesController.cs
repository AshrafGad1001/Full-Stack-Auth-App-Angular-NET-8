using API.DTOs;
using API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize(Roles = "Admin")]
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
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RoleResponseDto>>> GetRoles()
        {
            //List Of Users With Total user Count
            var roles = await _roleManager.Roles.Select(r => new RoleResponseDto
            {
                Id = r.Id,
                Name = r.Name,
                TotalUsers = _userManager.GetUsersInRoleAsync(r.Name!).Result.Count
            }).ToListAsync();

            return Ok(roles);
        }

        [HttpDelete]
        public async Task<ActionResult> DeleteRole(string id)
        {
            //Find Role By Id 
            var role = await _roleManager.FindByIdAsync(id);

            if (role is null)
            {
                return NotFound("Role Not Found");
            }
            var Result = await _roleManager.DeleteAsync(role);
            if (Result.Succeeded)
            {
                return Ok(new { message = "Role Deleted Successfully" });
            }
            return BadRequest("role Deletion Failed.");
        }


        [HttpPost("assign")]
        public async Task<IActionResult> AssignRole([FromBody] RoleAssignDto roleAssignDto)
        {
            var user = await _userManager.FindByIdAsync(roleAssignDto.UserId);
            if (user is null)
            {
                return NotFound("User NotFound.");
            }

            var role = await _roleManager.FindByIdAsync(roleAssignDto.RoleId);
            if (role is null)
            {
                return NotFound("Role NotFound.");
            }

            var Result = await _userManager.AddToRoleAsync(user, role.Name!);
            if (Result.Succeeded)
            {
                return Ok(new { Message = "Role Assigned Successfully ." });
            }
            var error = Result.Errors.FirstOrDefault();
            return BadRequest(error!.Description);
        }
    }
}