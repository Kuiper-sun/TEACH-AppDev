using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dto.DailyTimeRecord
{
    public class UpdateDailyTimeRecordRequestDto
    {
        public DateTime TimeOut { get; set; }

        public decimal TotalHours { get; set; }

        public string Remarks { get; set; } = String.Empty;
    }
}