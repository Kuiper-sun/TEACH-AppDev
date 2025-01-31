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
                grade = pt.grade
            };
        }

        public static PerformanceTask ToPerformanceTaskFromCreatePerformanceTaskDto(this CreatePerformanceTaskDto createDto, int studentId)
        {
            return new PerformanceTask
            {
                TaskDetails = createDto.TaskDetails,
                grade = createDto.grade,
                StudentId = studentId
            };
        }
    }
}