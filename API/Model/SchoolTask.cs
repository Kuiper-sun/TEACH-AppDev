using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Model
{
    public class SchoolTask
    {
        public int Id { get; set; }
        public string TaskName { get; set; } = String.Empty;
        public string PriorityLevel { get; set; } = String.Empty;

        [Column(TypeName = "decimal (18,2)")]
        public decimal EstimatedHours { get; set; }

        [Column(TypeName = "decimal (18,2)")]
        public decimal TotalFreeTime { get; set; }


        //Nav Property
        public int? UserAccountId { get; set; }
        public UserAccount? UserAccount { get; set; }
    }
}