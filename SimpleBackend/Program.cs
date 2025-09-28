using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);

builder.WebHost.UseUrls("http://*:80");

builder.Services.AddControllers();
builder.Services.AddCors(Options =>
{
    Options.AddPolicy("AllowFrontend",
    policy =>
    {
        policy.WithOrigins("http://localhost")
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});

var app = builder.Build();


app.UseCors("AllowFrontend");
app.UseAuthorization();

app.MapGet("/", () => "API - /api/materials");
app.MapControllers();

app.Run();