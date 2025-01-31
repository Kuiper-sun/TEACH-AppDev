using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dto.PerformanceTask;
using API.Dto.QuarterlyAssessment;
using API.Dto.WrittenWorks;
using API.Model;

namespace API.Dto.Student
{
    public class StudentDto
    {
        public string StudentName { get; set; } = string.Empty;
        public List<WrittenWorkDto> WrittenWorks {get; set;}
        public List<PerformanceTaskDto> PerformanceTasks {get; set;}
        public List<QuarterlyAssessmentDto> QuarterlyAssessments {get; set;}
    }
}