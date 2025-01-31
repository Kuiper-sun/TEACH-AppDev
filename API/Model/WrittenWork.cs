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
        public decimal grade { get; set; }

        //Nav Property
        public int? StudentId {get; set;}
        public Student? Student{get; set;}
    }
}