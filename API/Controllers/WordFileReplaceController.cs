// using System;
// using System.Collections.Generic;
// using System.Linq;
// using System.Threading.Tasks;
// using API.Dto.LessonPlanLayout;
// using API.Interfaces;
// using Microsoft.AspNetCore.Mvc;
// using Microsoft.EntityFrameworkCore.Metadata.Internal;

// namespace API.Controllers
// {
//     [Route("api/Generate")]
//     [ApiController]
//     public class WordFileReplaceController : ControllerBase
//     {
//         private readonly ILessonPlanLayoutRepository _lessonPlanRepo;
//         public WordFileReplaceController(ILessonPlanLayoutRepository lessonPlanRepo)
//         {
//             _lessonPlanRepo = lessonPlanRepo;
//         }

//         [HttpPost("UpdateLessonPlan")]
//         public IActionResult generateLessonPlan([FromBody] )
//         {
//             return View();
//         }
//     }
// }