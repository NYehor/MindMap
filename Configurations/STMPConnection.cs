using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Procoder
{
    public class STMPConnection
    {
        public string Server { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public int Port { get; set; }
        public bool UseSSL { get; set; }
        public string CompanyName { get; set; }
        public int TimeOut { get; set; }
    }
}
