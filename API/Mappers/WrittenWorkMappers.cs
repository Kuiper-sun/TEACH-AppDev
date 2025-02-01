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
                QuizScores = writtenWork.QuizScores,
                WrittenActivityScores = writtenWork.WrittenActivityScores,
                OverallWrittenScores = writtenWork.OverallWrittenScores,
                Percentage = writtenWork.Percentage,
                TotalItems = writtenWork.TotalItems
            };
        }

        public static WrittenWork toWrittenWorkFromCreateRequestDto(this CreateWrittenWorksRequestDto createDto, int studentId)
        {
            return new WrittenWork
            {
                WorkDetails = createDto.WorkDetails,
                QuizScores = createDto.QuizScores,
                WrittenActivityScores = createDto.WrittenActivityScores,
                OverallWrittenScores = createDto.OverallWrittenScores,
                Percentage = createDto.Percentage,
                TotalItems = createDto.TotalItems,
                StudentId = studentId
            };
        }
        
    }
}