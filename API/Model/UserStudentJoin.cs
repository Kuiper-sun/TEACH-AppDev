using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Model
{
    [Table("UserStudentJoin")]
    public class UserStudentJoin
    {
        public int UserId { get; set; }
        public int StudentId { get; set; }

        //Nav Prop
        public UserAccount UserAccount { get; set; }
        public Student Student { get; set; }
    }
}