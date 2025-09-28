using Microsoft.AspNetCore.Mvc;

namespace SimpleBackend;

[ApiController]
[Route("api/[controller]")]
public class MaterialsController : ControllerBase
{
    private static readonly string[] Materials = new[]
    {
        "Детектив", "Драма", "Фантастика", "Биография", "Наука", "Ужасы"
    };

    [HttpGet]
    public IEnumerable<string> Get() => Materials;
}