using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Model
{
    public class WrittenWork
    {
        public int Id { get; set; }
        public string WorkDetails { get; set; } = string.Empty;

        [Column(TypeName = "decimal(18, 2)")]
        public decimal QuizScores { get; set; }

        [Column(TypeName = "decimal(18, 2)")]
        public decimal WrittenActivityScores { get; set; }

        [Column(TypeName = "decimal(18, 2)")]
        public decimal OverallWrittenScores { get; set; }

        [Column(TypeName = "decimal(18, 2)")]
        public decimal Percentage { get; set; }

        public int TotalItems { get; set; }


        //Nav Property
        public int? StudentId {get; set;}
        public Student? Student{get; set;}
    }
}