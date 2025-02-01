using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dto.DailyTimeRecord;
using API.Interfaces;
using API.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/TimeRecord")] 
    public class DailyTimeRecordLayoutController : ControllerBase
    {
        private readonly IDailyTimeRecordLayout _dailyTimeRecordLayoutRepo;
        private readonly ITemplateTypeRepository _templateTypeRepo;

        public DailyTimeRecordLayoutController(IDailyTimeRecordLayout dailyTimeRecordLayoutRepo, ITemplateTypeRepository templateTypeRepo)
        {
            _dailyTimeRecordLayoutRepo = dailyTimeRecordLayoutRepo;
            _templateTypeRepo = templateTypeRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllTimeRecords()
        {
            var timeRecords = await _dailyTimeRecordLayoutRepo.GetDailyTimeRecordAsync();
            var timeRecordsDto = timeRecords.Select(timeRecords => timeRecords.toTimeRecordDto());
            return Ok(timeRecordsDto);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var timeRecord = await _dailyTimeRecordLayoutRepo.GetTimeRecordByIdAsync(id);
            if(timeRecord == null)
            {
                return NotFound();
            }
            return Ok(timeRecord.toTimeRecordDto());
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteById([FromRoute] int id)
        {
            var timeRecord = await _dailyTimeRecordLayoutRepo.DeleteTimeRecordAsync(id);
            if(timeRecord == null)
            {
                return NotFound();
            }
            return NoContent();
        }

        [HttpPost]
        [Route("{TemplateId}")]
        public async Task<IActionResult> CreateTimeRecord([FromRoute] int TemplateId, [FromBody] CreateDailyTimeRecordRequestDto createDto)
        {
            if(!await _templateTypeRepo.TemplateTypeExistsAsync(TemplateId))
            {
                return NotFound();
            }
            var timeRecord = createDto.ToTimeRecordFromCreateRequestDto(TemplateId);
            await _dailyTimeRecordLayoutRepo.CreateTimeRecordAsync(timeRecord);
            return CreatedAtAction(nameof(GetById), new { id = timeRecord.Id }, timeRecord.toTimeRecordDto());
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateTimeRecord([FromRoute] int id, [FromBody] UpdateDailyTimeRecordRequestDto updateDto)
        {
            var timeRecord = await _dailyTimeRecordLayoutRepo.UpdateTimeRecordAsync(id, updateDto);
            if(timeRecord == null)
            {
                return NotFound();
            }
            return Ok(timeRecord.toTimeRecordDto());
        }
    }
}