using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dto.DailyTimeRecord;
using API.Model;

namespace API.Mappers
{
    public static class DailyTimeRecordLayoutMappers
    {
        public static DailyTimeRecordDto toTimeRecordDto(this DailyTimeRecordLayout dailyTimeRecordLayout)
        {
            return new DailyTimeRecordDto
            {
                TimeOut = dailyTimeRecordLayout.TimeOut,
                TotalHours = dailyTimeRecordLayout.TotalHours,
                Remarks = dailyTimeRecordLayout.Remarks
            };
        }

        public static DailyTimeRecordLayout ToTimeRecordFromCreateRequestDto(this CreateDailyTimeRecordRequestDto request, int TemplateId)
        {
            return new DailyTimeRecordLayout
            {
                TimeOut = request.TimeOut,
                TotalHours = request.TotalHours,
                Remarks = request.Remarks,
                TemplateTypeId = TemplateId
            };
        }
    }
}