using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Model
{
    public class UserAccount
    {
        public int Id { get; set; }
        public string FullName { get; set; } = String.Empty;
        public string Email { get; set; } = String.Empty;
        public string Password { get; set; } = String.Empty;

        public List<SchoolResource> SchoolResources { get; set; } = new List<SchoolResource>();
        public List<SchoolTask> SchoolTasks { get; set; } = new List<SchoolTask>();
    }
}