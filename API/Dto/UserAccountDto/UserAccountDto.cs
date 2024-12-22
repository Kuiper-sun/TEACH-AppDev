using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Model;

namespace API.Dto.UserAccountDto
{
    public class UserAccountDto
    {
        public string FullName { get; set; } = String.Empty;
        public string Email { get; set; } = String.Empty;
        public string Password { get; set; } = String.Empty;

        public List<SchoolResource> SchoolResources { get; set; } = new List<SchoolResource>();
        public List<SchoolTask> SchoolTasks { get; set; } = new List<SchoolTask>();
    }
}