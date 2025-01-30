using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dto.LessonPlanLayout;

namespace API.Interfaces
{
    public interface IWordFileGeneratorService
    {
        Task<MemoryStream> GenerateLessonPlanWordFile(int userId, int lessonPlanId, int templateId);
    }
}