﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using Procoder.Models;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Procoder.Configurations;

namespace Procoder.Services.Security
{
    public class AuthenticateService: IAuthenticateService
    {
        private List<User> users = new List<User>
        {
            new User { Id = 1, FirstName = "Test", LastName = "User", Login = "test", Password = "test" }
        };

        private readonly AppSettings appSettings;
        private ProcederContext dbContext;

        public AuthenticateService(IOptions<AppSettings> appSettings, ProcederContext dbContext)
        {
            this.appSettings = appSettings.Value;
            this.dbContext = dbContext;
        }

        public User Authenticate(string login, string password)
        {
            var user = users.SingleOrDefault();

            if (user == null)
                return null;

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return user;
        }
    }
}
