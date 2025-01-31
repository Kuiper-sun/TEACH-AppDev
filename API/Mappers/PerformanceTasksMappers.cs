using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dto.PerformanceTask;
using API.Model;

namespace API.Mappers
{
    public static class PerformanceTasksMappers
    {
        public static PerformanceTaskDto toPerformanceTaskDto(this PerformanceTask pt)
        {
            return new PerformanceTaskDto
            {
                TaskDetails = pt.TaskDetails,
                Attendance = pt.Attendance,
                TotalClasses = pt.TotalClasses,
                PracticumScores = pt.PracticumScores,
                TotalPracticumScores = pt.TotalPracticumScores,
                RecitationScores = pt.RecitationScores,
                ParticipationActivities = pt.ParticipationActivities,
                Percentage = pt.Percentage
            };
        }

        public static PerformanceTask ToPerformanceTaskFromCreatePerformanceTaskDto(this CreatePerformanceTaskDto createDto, int studentId)
        {
            return new PerformanceTask
            {
                TaskDetails = createDto.TaskDetails,
                Attendance = createDto.Attendance,
                TotalClasses = createDto.TotalClasses,
                PracticumScores = createDto.PracticumScores,
                TotalPracticumScores = createDto.TotalPracticumScores,
                RecitationScores = createDto.RecitationScores,
                ParticipationActivities = createDto.ParticipationActivities,
                Percentage = createDto.Percentage,
                StudentId = studentId
            };
        }
    }
}