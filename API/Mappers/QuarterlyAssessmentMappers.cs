using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dto.QuarterlyAssessment;
using API.Model;

namespace API.Mappers
{
    public static class QuarterlyAssessmentMappers
    {
        public static QuarterlyAssessmentDto toQuarterlyAssessmentDto(this QuarterlyAssessment qa)
        {
            return new QuarterlyAssessmentDto
            {
                QAssessmentDetails = qa.QAssessmentDetails,
                ExamScores = qa.ExamScores,
                TotalExamScores = qa.TotalExamScores,
                Percentage = qa.Percentage
            };
        }

        public static QuarterlyAssessment toQuarterlyAssessmentFromCreateDto(this CreateQuarterlyAssessmentDto createDto, int studentId)
        {
            return new QuarterlyAssessment
            {
                QAssessmentDetails = createDto.QAssessmentDetails,
                ExamScores = createDto.ExamScores,
                TotalExamScores = createDto.TotalExamScores,
                Percentage = createDto.Percentage,
                StudentId = studentId 
            };
        }
    }
}