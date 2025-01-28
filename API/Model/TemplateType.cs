using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Model
{
    [Table("TemplateType")]
    public class TemplateType
    {
        public int Id { get; set; }
        public string TemplateName { get; set; } = String.Empty;

        public List<LessonPlanLayout> LessonPlanLayouts {get; set;} = new List<LessonPlanLayout>();
        public List<DailyLessonLogLayout> DailyLessonLogLayouts {get; set;} = new List<DailyLessonLogLayout>();
        public List<DailyTimeRecordLayout> DailyTimeRecordLayouts {get; set;} = new List<DailyTimeRecordLayout>();

        public List<UserTemplateJoin> UserTemplateJoins { get; set; } = new List<UserTemplateJoin>();   
        
    }
}