using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dto.DailyLessonLog;
using API.Model;

namespace API.Mappers
{
    public static class DailyLessonLogLayoutMappers
    {
        public static LessonLogDto ToLessonLogDto(this DailyLessonLogLayout dailyLessonLogLayout)
        {
            return new LessonLogDto
            {
                GradeLevel = dailyLessonLogLayout.GradeLevel,
                Subject = dailyLessonLogLayout.Subject,
                Activities = dailyLessonLogLayout.Activities,
                Materials = dailyLessonLogLayout.Materials,
                Reflection = dailyLessonLogLayout.Reflection,
                DayOfWeek = dailyLessonLogLayout.DayOfWeek
            };
        }

        public static DailyLessonLogLayout ToLessonLogFromCreateDto(this CreateLessonLogRequestDto request, int TemplateId)
        {
            return new DailyLessonLogLayout
            {
                GradeLevel = request.GradeLevel,
                Subject = request.Subject,
                Activities = request.Activities,
                Materials = request.Materials,
                Reflection = request.Reflection,
                DayOfWeek = request.DayOfWeek,
                TemplateTypeId = TemplateId
            };
        }

    }
}