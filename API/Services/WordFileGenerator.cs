using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dto.DailyLessonLog;
using API.Dto.LessonPlanLayout;
using API.Interfaces;
using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;

namespace API.Services
{
    public class WordFileGenerator : IWordFileGeneratorService
    {
        private readonly IWebHostEnvironment _env;
        private readonly ILessonPlanLayoutRepository _lessonPlanRepo;
        private readonly IDailyLessonLogLayoutRepository _lessonLog;
        public WordFileGenerator(IWebHostEnvironment env, ILessonPlanLayoutRepository lessonPlanRepo, IDailyLessonLogLayoutRepository lessonLog)
        {
            _env = env;
            _lessonPlanRepo = lessonPlanRepo;
            _lessonLog = lessonLog;
        }

        //Generates Word file for lesson plan
        public async Task<MemoryStream> GenerateLessonPlanWordFile(int userId, int lessonPlanId, int templateId)
        {
            //Retrieve Data
            var content = await _lessonPlanRepo.GetLessonPlanContent(userId , lessonPlanId, templateId);

            if(content == null)
            {
                throw new Exception("Lesson plan content not found or unathorized access");
            }

            //Construct Template Path and Load
            var templatePath = Path.Combine(_env.ContentRootPath, "Templates", "LessonPlan.docx");

            if(!File.Exists(templatePath))
            {
                throw new Exception("Template not found");
            }

            var memoryStream = new MemoryStream();
            using(var filestream = new FileStream(templatePath, FileMode.Open, FileAccess.Read))
            {
                await filestream.CopyToAsync(memoryStream);
            }

            Console.WriteLine($"DEBUG: SubjectMatter = '{content.SubjectMatter}'");

            //Placeholders to check
            var replacements = new Dictionary<string, string>
            {
                {"[Level]", content.GradeLevel},
                {"[Subject]", content.Subject},
                {"{Matter}", content.SubjectMatter},
                {"[Objectives]", content.Objectives},
                {"[Procedure]", content.Procedure},
                {"[Assessment]", content.Assessment},
                {"[Assignment]", content.Assignment}
            };

            //Replace placeholders with content
            ReplacePlaceHolders(memoryStream, replacements);

            return memoryStream;
        }

        //Generate word file for LessonLog
        public async Task<MemoryStream> GenerateUserLessonLogWordFile(int userId, int templateId)
        {
            var userData = await _lessonLog.GetUserLessonLog(userId, templateId);
            if (userData == null || !userData.Any())
            {
                throw new Exception("No lesson logs found for this user or template");
            }

            var templatePath = Path.Combine(_env.ContentRootPath, "Templates", "LessonLog.docx");
            if (!File.Exists(templatePath))
            {
                throw new FileNotFoundException("Template file not found");
            }

            // Create a copy of the template in memory
            var memoryStream = new MemoryStream();
            using (var fileStream = new FileStream(templatePath, FileMode.Open, FileAccess.Read))
            {
                await fileStream.CopyToAsync(memoryStream);
            }

            // Reset position before working with the document
            memoryStream.Position = 0;

            // Perform all document operations in a single OpenXML session
            using (var doc = WordprocessingDocument.Open(memoryStream, true))
            {
                var body = doc.MainDocumentPart.Document.Body;
                
                // Replace placeholders first
                ReplacePlaceHolders(doc, new Dictionary<string, string>
                {
                    {"{GradeLevel}", userData.First().GradeLevel},
                    {"{Subject}", userData.First().Subject}
                });

                // Add daily sections
                var orderedLogs = userData
                    .OrderBy(l => l.Date)
                    .GroupBy(l => l.DayOfWeek?.Trim() ?? string.Empty)
                    .Select(g => g.First());

                foreach (var log in orderedLogs)
                {
                    // Add day header
                    body.Append(CreatedDayHeader(log.DayOfWeek));
                    
                    // Add content section
                    body.Append(CreateDaySection(log));
                }

                // Ensure proper XML structure
                body.Append(new Paragraph(new Run(new Text(""))));
                doc.MainDocumentPart.Document.Save();
            }

            // Reset position before returning
            memoryStream.Position = 0;
            return memoryStream;
        }

        private Paragraph CreatedDayHeader(string dayName)
        {
            return new Paragraph(
                new ParagraphProperties(
                    new Justification() { Val = JustificationValues.Center },
                    new Bold() // ✅ Ensure the header is bold
                ),
                new Run(
                    new Text(dayName?.ToUpper() ?? "DAY")
                ),
                new Run(new Break()) // ✅ Add a break for proper spacing
            );
        }

        private List<OpenXmlElement> CreateDaySection(LessonLogContentDto log)
        {
            return new List<OpenXmlElement>
            {
                CreateSection("I. Activities", log.Activities),
                CreateSection("II. Learning Resources", log.Materials),
                CreateSection("III. Reflection", log.Reflection)
            };
        }

        private Paragraph CreateSection(string title, string content)
        {
            return new Paragraph(
                new Run(new Text(title) { Space = SpaceProcessingModeValues.Preserve }),
                new Run(new Break()),
                new Run(new Text(content ?? "N/A")),
                new Run(new Break()),
                new Run(new Break()), // ✅ Ensure extra spacing
                new Run(new Text(" ")) // ✅ Add extra spacing to prevent merge
            );
        }



        private void ReplacePlaceHolders(MemoryStream stream, Dictionary<string, string> replacements)
        {
            using(var doc = WordprocessingDocument.Open(stream , true))
            {
                var body = doc.MainDocumentPart.Document.Body;

                foreach(var paragraph in body.Elements<Paragraph>())
                {
                    foreach(var run in paragraph.Elements<Run>())
                    {
                        foreach(var text in run.Elements<Text>())
                        {
                            foreach(var key in replacements.Keys)
                            {
                                if(text.Text.Contains(key))
                                {
                                    text.Text = text.Text.Replace(key, replacements[key]);
                                }
                            }
                        }
                    }
                }
                doc.MainDocumentPart.Document.Save();
            }
            stream.Position = 0;
        }


        private void ReplacePlaceHolders(WordprocessingDocument doc, Dictionary<string, string> replacements)
        {
            var body = doc.MainDocumentPart.Document.Body;
            
            foreach (var text in body.Descendants<Text>())
            {
                foreach (var key in replacements.Keys)
                {
                    if (text.Text.Contains(key))
                    {
                        text.Text = text.Text.Replace(key, replacements[key]);
                        text.Space = SpaceProcessingModeValues.Preserve;
                    }
                }
            }
            doc.MainDocumentPart.Document.Save();
        }
    }
}