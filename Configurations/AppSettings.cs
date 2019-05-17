using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Procoder.Configurations
{
    public interface IAppSettings
    {
        string Secret { get; set; }
    }

    public class AppSettings: IAppSettings
    {
        public string Secret { get; set; }
    }
}
