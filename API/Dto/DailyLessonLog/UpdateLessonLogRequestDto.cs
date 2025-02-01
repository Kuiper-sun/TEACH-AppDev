using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dto.DailyLessonLog
{
    public class UpdateLessonLogRequestDto
    {
        public string GradeLevel { get; set; } = String.Empty;
        public string Subject { get; set; } = String.Empty;
        public string Activities{ get; set; } = String.Empty;
        public string Materials { get; set; } = String.Empty;
        public string Reflection { get; set; } = String.Empty;
    }
}