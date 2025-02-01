using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dto.SchoolTask;
using API.Model;

namespace API.Mappers
{
    public static class SchoolTaskMappers
    {
        public static SchoolTaskDto ToSchoolTaskDto(this SchoolTask task)
        {
            return new SchoolTaskDto
            {
                TaskName = task.TaskName,
                PriorityLevel = task.PriorityLevel,
                EstimatedHours = task.EstimatedHours,
                TotalFreeTime = task.TotalFreeTime
            };
        }

        public static SchoolTask ToSchoolTaskFromCreateTaskDto(this CreateSchoolTaskDto createTaskDto, int UserId)
        {
            return new SchoolTask
            {
                TaskName = createTaskDto.TaskName,
                PriorityLevel = createTaskDto.PriorityLevel,
                EstimatedHours = createTaskDto.EstimatedHours,
                TotalFreeTime = createTaskDto.TotalFreeTime,
                UserAccountId = UserId
            };
        }
        
    }
}