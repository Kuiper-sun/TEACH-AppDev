using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dto.UserAccountDto
{
    public class CreateUserAccountRequestDto
    {
        public string FullName { get; set; } = String.Empty;
        public string Email { get; set; } = String.Empty;

        [MinLength(6, ErrorMessage = "Password must be at least 6 characters")]
        public string Password { get; set; } = String.Empty;
    }
}