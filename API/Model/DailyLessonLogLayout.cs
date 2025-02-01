using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Model
{
    [Table("DailyLessonLogLayout")]
    public class DailyLessonLogLayout
    {
        public int Id { get; set; }
        public DateTime Date { get; set; } = DateTime.Now;
        public string DayOfWeek { get; set; } = String.Empty;
        public string GradeLevel { get; set; } = String.Empty;
        public string Subject { get; set; } = String.Empty;
        public string Activities{ get; set; } = String.Empty;
        public string Materials { get; set; } = String.Empty;
        public string Reflection { get; set; } = String.Empty;

        //Nav Property
        public int? TemplateTypeId { get; set; }    
        public TemplateType? TemplateType { get; set; }
    }
}