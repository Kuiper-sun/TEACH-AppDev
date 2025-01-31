using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dto.PerformanceTask
{
    public class UpdatePerfomanceTaskRequestDto
    {
        public string TaskDetails { get; set; } = string.Empty;
        public decimal grade { get; set; } 
    }
}