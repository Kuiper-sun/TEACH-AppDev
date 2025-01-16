using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Model
{
    public class TemplateType
    {
        public int Id { get; set; }
        public string TemplateName { get; set; } = String.Empty;

        public List<LessonPlanLayout> LessonPlanLayouts {get; set;} = new List<LessonPlanLayout>();
        public List<DailyLessonLogLayout> DailyLessonLogLayouts {get; set;} = new List<DailyLessonLogLayout>();
        public List<DailyTimeRecordLayout> DailyTimeRecordLayouts {get; set;} = new List<DailyTimeRecordLayout>();
    }
}