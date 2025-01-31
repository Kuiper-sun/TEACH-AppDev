using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dto.WrittenWorks;
using API.Model;

namespace API.Mappers
{
    public static class WrittenWorkMappers
    {
        public static WrittenWorkDto toWrittenWorkDto(this WrittenWork writtenWork)
        {
            return new WrittenWorkDto
            {
                WorkDetails = writtenWork.WorkDetails,
                grade = writtenWork.grade
            };
        }

        public static WrittenWork toWrittenWorkFromCreateRequestDto(this CreateWrittenWorksRequestDto createDto, int studentId)
        {
            return new WrittenWork
            {
                WorkDetails = createDto.WorkDetails,
                grade = createDto.grade,
                StudentId = studentId
            };
        }
        
    }
}