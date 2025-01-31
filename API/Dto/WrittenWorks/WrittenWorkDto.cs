using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dto.WrittenWorks
{
    public class WrittenWorkDto
    {
        public string WorkDetails { get; set; } = string.Empty;
        public decimal grade { get; set; }
    }
}