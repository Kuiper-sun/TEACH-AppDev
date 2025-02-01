using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dto.WrittenWorks
{
    public class CreateWrittenWorksRequestDto
    {
        public string WorkDetails { get; set; } = string.Empty;
        public decimal QuizScores { get; set; }
        public decimal WrittenActivityScores { get; set; }
        public decimal OverallWrittenScores { get; set; }
        public decimal Percentage { get; set; }
        public int TotalItems { get; set; }
    }
}