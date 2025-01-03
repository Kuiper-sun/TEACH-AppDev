using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dto.LessonPlanLayout
{
    public class UpdateLessonPlanRequestDto
    {
        public string GradeLevel { get; set; } = String.Empty;
        public string Subject { get; set; } = String.Empty;
        public string SubjectMatter { get; set; } = String.Empty;
        public string Objectives { get; set; } = String.Empty;
        public string Procedure { get; set; } = String.Empty;
        public string Assessment { get; set; } = String.Empty;
        public string Assignment { get; set; } = String.Empty;

    }
}