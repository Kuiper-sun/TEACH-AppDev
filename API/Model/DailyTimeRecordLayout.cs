using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Model
{
    public class DailyTimeRecordLayout
    {
        public int Id { get; set; }
        public DateTime TimeIn { get; set; } = DateTime.Now;
        public DateTime TimeOut { get; set; }

        [Column(TypeName = "decimal(18, 2)")]
        public decimal TotalHours { get; set; }

        public string Remarks { get; set; } = String.Empty;
        

        //Nav Property
        public int? TemplateTypeId { get; set; }
        public TemplateType? TemplateType { get; set; }
    }
}