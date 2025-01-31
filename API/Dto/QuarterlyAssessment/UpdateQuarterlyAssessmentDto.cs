using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dto.QuarterlyAssessment
{
    public class UpdateQuarterlyAssessmentDto
    {
        public string QAssessmentDetails { get; set; } = string.Empty;
        public decimal grade { get; set; }
    }
}