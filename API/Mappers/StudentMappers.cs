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
                WrittenWorks = student.WrittenWorks.Select(x => x.toWrittenWorkDto()).ToList(),
            };
        }

        public static Student toStudentFromCreateStudentRequestDto(this CreateStudentRequestDto createDto)
        {
            return new Student
            {
                StudentName = createDto.StudentName
            };
        }
    }
}