using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Model
{
    [Table("UserAccount")]
    public class UserAccount
    {
        public int Id { get; set; }
        public string FullName { get; set; } = String.Empty;
        public string Email { get; set; } = String.Empty;
        public string Password { get; set; } = String.Empty;

        public List<SchoolResource> SchoolResources { get; set; } = new List<SchoolResource>();
        public List<SchoolTask> SchoolTasks { get; set; } = new List<SchoolTask>();
        public List<UserTemplateJoin> UserTemplateJoins { get; set; } = new List<UserTemplateJoin>();

        public List<UserStudentJoin> UserStudentJoins {get; set;} = new List<UserStudentJoin>();
        
    }
}