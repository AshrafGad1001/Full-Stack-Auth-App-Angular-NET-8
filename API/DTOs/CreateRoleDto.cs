using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class CreateRoleDto
    {
        [Required(ErrorMessage = "Role Name Is Required")]
        public string RoleName { get; set; } = null!;
    }
}