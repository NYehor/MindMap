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

    public class AppSettings : IAppSettings
    {
        public string Secret { get; set; }
        public STMPConnection STMPConnection { get; set; }
        public string Domain { get; set; }
        public string GoogleClientId { get; set; }
        public string GoogleClientSecret { get; set; }
        public string EmailText { get; set; }
    }
}
