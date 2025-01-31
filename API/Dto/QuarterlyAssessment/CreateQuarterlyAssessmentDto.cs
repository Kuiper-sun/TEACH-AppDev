using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dto.QuarterlyAssessment
{
    public class CreateQuarterlyAssessmentDto
    {
        public string QAssessmentDetails { get; set; } = string.Empty;


        public decimal ExamScores { get; set; }

        public decimal TotalExamScores { get; set; }

        public decimal Percentage { get; set; }
    }
}