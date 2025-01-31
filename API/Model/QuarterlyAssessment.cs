using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Model
{
    public class QuarterlyAssessment
    {
        public int Id { get; set; }
        public string QAssessmentDetails { get; set; } = string.Empty;


        [Column(TypeName = "decimal(18,2)")]
        public decimal ExamScores { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal TotalExamScores { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal Percentage { get; set; }
        //Nav Property
        public int? StudentId { get; set; }
        public Student? Student { get; set; }
    }
}