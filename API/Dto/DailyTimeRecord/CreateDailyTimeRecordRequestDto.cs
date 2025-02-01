using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dto.DailyTimeRecord
{
    public class CreateDailyTimeRecordRequestDto
    {
        public DateTime TimeIn { get; set; } = DateTime.Now;

        //Note: Might remove Timeout (Testing purposes)
        public DateTime TimeOut { get; set; }

        public decimal TotalHours { get; set; }

        public string Remarks { get; set; } = String.Empty;
    }
}