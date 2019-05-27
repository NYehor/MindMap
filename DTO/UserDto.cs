using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace Procoder.DTO
{
    public class UserDto
    {
        [JsonProperty("userId")]
        public int Id { get; set; }
        [JsonProperty("userName")]
        public string Name { get; set; }
        [JsonProperty("email")]
        public string Email { get; set; }
        [JsonProperty("token")]
        public string Token { get; set; }
    }
}
