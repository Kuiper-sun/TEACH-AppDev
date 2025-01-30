using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dto.LessonPlanLayout;
using API.Interfaces;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;

namespace API.Services
{
    public class WordFileGenerator : IWordFileGeneratorService
    {
        private readonly IWebHostEnvironment _env;
        private readonly ILessonPlanLayoutRepository _lessonPlanRepo;
        public WordFileGenerator(IWebHostEnvironment env, ILessonPlanLayoutRepository lessonPlanRepo)
        {
            _env = env;
            _lessonPlanRepo = lessonPlanRepo;
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
                filestream.CopyTo(memoryStream);
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
            }
            stream.Position = 0;
        }
    }
}