using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dto.DailyLessonLog;
using API.Dto.DailyTimeRecord;
using API.Dto.LessonPlanLayout;

namespace API.Dto.TemplateType
{
    public class TemplateTypeDto
    {
        public int Id { get; set; }
        public string TemplateName { get; set; } = String.Empty;
        public List<LessonPlanDto> LessonPlans { get; set; }
        public List<LessonLogDto> LessonLogs { get; set; }
        public List<DailyTimeRecordDto> DailyTimeRecords { get; set; }
    }
}