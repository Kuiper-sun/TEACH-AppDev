using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dto.Student;
using API.Model;

namespace API.Mappers
{
    public static class StudentMappers
    {
        public static StudentDto toStudentDto(this Student student)
        {
            return new StudentDto
            {
                StudentName = student.StudentName,
                StudentLrn = student.StudentLrn,
                Subject = student.Subject,
                Section = student.Section,
                WrittenWorks = student.WrittenWorks.Select(x => x.toWrittenWorkDto()).ToList(),
                PerformanceTasks = student.PerformanceTasks.Select(y => y.toPerformanceTaskDto()).ToList(),
                QuarterlyAssessments = student.QuarterlyAssessments.Select(z => z.toQuarterlyAssessmentDto()).ToList()
            };
        }

        public static Student toStudentFromCreateStudentRequestDto(this CreateStudentRequestDto createDto)
        {
            return new Student
            {
                StudentName = createDto.StudentName,
                StudentLrn = createDto.StudentLrn,
                Subject = createDto.Subject,
                Section = createDto.Section,
            };
        }
    }
}