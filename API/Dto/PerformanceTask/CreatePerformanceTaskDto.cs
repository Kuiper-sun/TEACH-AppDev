using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dto.PerformanceTask
{
    public class CreatePerformanceTaskDto
    {
        public string TaskDetails { get; set; } = string.Empty;
        public int Attendance { get; set; }
        public int TotalClasses { get; set; }
        public decimal PracticumScores { get; set; }
        public decimal TotalPracticumScores { get; set; }
        public decimal RecitationScores { get; set; }
        public decimal ParticipationActivities { get; set; }
        public decimal Percentage { get; set; }
    }
}