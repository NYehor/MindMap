using System;

namespace Procoder.Models
{
    public interface IMapForList
    {
        string Category { get; set; }
        string Name { get; set; }
        DateTime CreateData { get; set; }
        DateTime LastEdit { get; set; }
    }
}
