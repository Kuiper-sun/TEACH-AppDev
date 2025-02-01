using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dto.TemplateType;
using API.Model;

namespace API.Mappers
{
    public static class TemplateTypeMappers
    {
        public static TemplateTypeDto ToTemplateDto(this TemplateType templateType)
        {
            return new TemplateTypeDto
            {
                Id = templateType.Id,
                TemplateName = templateType.TemplateName,
                LessonPlans = templateType.LessonPlanLayouts.Select(l => l.tolessonPlanDto()).ToList(),
                LessonLogs = templateType.DailyLessonLogLayouts.Select(l => l.ToLessonLogDto()).ToList(),
                DailyTimeRecords = templateType.DailyTimeRecordLayouts.Select(l => l.toTimeRecordDto()).ToList()
            };
        }

        public static TemplateType ToTemplateTypeFromCreateTemplateRequestDto(this CreateTemplateRequestDto createTemplateRequestDto)
        {
            return new TemplateType
            {
                TemplateName = createTemplateRequestDto.TemplateName
            };
        }
    }
}