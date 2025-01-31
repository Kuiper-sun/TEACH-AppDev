using API.Data;
using API.Interfaces;
using API.Repository;
using API.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddControllers().AddNewtonsoftJson(options =>
    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
);

builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddScoped<IUserAccountRepository, UserAccountRepository>();
builder.Services.AddScoped<ISchoolTaskRepository, SchoolTaskRepository>();
builder.Services.AddScoped<ISchoolResourceRepository, SchoolResourceRepository>();
builder.Services.AddScoped<ITemplateTypeRepository, TemplateTypeRepository>();
builder.Services.AddScoped<ILessonPlanLayoutRepository, LessonPlanLayoutRepository>();
builder.Services.AddScoped<IDailyLessonLogLayoutRepository, DailyLessonLogLayoutRepository>();
builder.Services.AddScoped<IDailyTimeRecordLayout, DailyTimeRecordLayoutRepository>();
builder.Services.AddScoped<IUserTemplateJoin, UserTemplateJoinRepository>();
builder.Services.AddScoped<IWordFileGeneratorService, WordFileGenerator>(); 
builder.Services.AddScoped<IStudentRepository, StudentRepository>();
builder.Services.AddScoped<IWrittenWorkRepository, WrittenWorksRepository>();
builder.Services.AddScoped<IQuarterlyAssessmentRepository, QuarterlyAssessmentRepository>();
builder.Services.AddScoped<IUserStudentJoin, UserStudenJoinRepository>();
// builder.Services.AddScoped<>();
// builder.Services.AddScoped<>();
// builder.Services.AddScoped<>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(x => x
 .AllowAnyMethod()
 .AllowAnyHeader()
 .WithOrigins("http://127.0.0.1:5500/TestAPI") // Remove final slash in the URL to avoid errors use the format "http://localhost:3000" instead of "http://localhost:3000/"
 .SetIsOriginAllowed(origin => true)
 );

app.UseAuthorization();

app.MapControllers();

app.Run();