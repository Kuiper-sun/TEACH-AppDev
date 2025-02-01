using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dto.SchoolTask
{
    public class UpdateSchoolTaskRequestDto
    {
        public string TaskName { get; set; } = String.Empty;
        public string PriorityLevel { get; set; } = String.Empty;
        public decimal EstimatedHours { get; set; }
        public decimal TotalFreeTime { get; set; }
    }
}