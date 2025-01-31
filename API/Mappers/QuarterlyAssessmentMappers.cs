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
                grade = qa.grade
            };
        }

        public static QuarterlyAssessment toQuarterlyAssessmentFromCreateDto(this CreateQuarterlyAssessmentDto createDto, int studentId)
        {
            return new QuarterlyAssessment
            {
                QAssessmentDetails = createDto.QAssessmentDetails,
                grade = createDto.grade,
                StudentId = studentId 
            };
        }
    }
}