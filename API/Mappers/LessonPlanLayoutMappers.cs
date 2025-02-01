using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dto.LessonPlanLayout;
using API.Model;

namespace API.Mappers
{
    public static class LessonPlanLayoutMappers
    {
        public static LessonPlanDto tolessonPlanDto(this LessonPlanLayout lessonPlan)
        {
            return new LessonPlanDto
            {
                GradeLevel = lessonPlan.GradeLevel,
                Subject = lessonPlan.Subject,
                SubjectMatter = lessonPlan.SubjectMatter,
                Objectives = lessonPlan.Objectives,
                Procedure = lessonPlan.Procedure,
                Assessment = lessonPlan.Assessment,
                Assignment = lessonPlan.Assignment
            };
        }

        public static LessonPlanLayout ToLessonPlanFromCreateDto(this CreateLessonPlanRequestDto request, int TemplateId)
        {
            return new LessonPlanLayout
            {
                GradeLevel = request.GradeLevel,
                Subject = request.Subject,
                SubjectMatter = request.SubjectMatter,
                Objectives = request.Objectives,
                Procedure = request.Procedure,
                Assessment = request.Assessment,
                Assignment = request.Assignment,
                TemplateTypeId = TemplateId
            };
        }
    }
}