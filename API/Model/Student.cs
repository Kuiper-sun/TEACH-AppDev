using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Model
{
    public class Student
    {
        public int Id { get; set; }
        public string StudentName { get; set; } = string.Empty;
        
        public List<WrittenWork> WrittenWorks {get; set;} = new List<WrittenWork>();
        public List<QuarterlyAssessment> QuarterlyAssessments {get; set;} = new List<QuarterlyAssessment>();
        public List<PerformanceTask> PerformanceTasks {get; set;} = new List<PerformanceTask>();

    }
}