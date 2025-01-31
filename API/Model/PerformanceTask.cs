using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Model
{
    public class PerformanceTask
    {
        public int Id { get; set; }
        public string TaskDetails { get; set; } = string.Empty;
        public int Attendance { get; set; }
        public int TotalClasses { get; set; }

        [Column(TypeName = "decimal(18, 2)")]
        public decimal PracticumScores { get; set; }

        [Column(TypeName = "decimal(18, 2)")]
        public decimal TotalPracticumScores { get; set; }

        [Column(TypeName = "decimal(18, 2)")]
        public decimal RecitationScores { get; set; }

        [Column(TypeName = "decimal(18, 2)")]
        public decimal ParticipationActivities { get; set; }

        [Column(TypeName = "decimal(18, 2)")]
        public decimal Percentage { get; set; }

        //Nav Property
        public int? StudentId { get; set; }
        public Student? Student { get; set; }
    }
}