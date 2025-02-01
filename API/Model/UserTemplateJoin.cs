using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Model
{
    [Table("UserTemplateJoin")]
    public class UserTemplateJoin
    {
        public int UserId { get; set; }
        public int TemplateId { get; set; }

        //Nav Prop
        public UserAccount UserAccount { get; set; }
        public TemplateType templateType { get; set; }
        
    }
}