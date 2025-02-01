using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dto.SchoolResource;
using API.Dto.SchoolTask;
using API.Model;

namespace API.Dto.UserAccountDto
{
    public class UserAccountDto
    {
        public string FullName { get; set; } = String.Empty;
        public string Email { get; set; } = String.Empty;
        public string Password { get; set; } = String.Empty;

        public List<SchoolResourceDto> SchoolResources { get; set; }
        public List<SchoolTaskDto> SchoolTasks { get; set; }
    }
}