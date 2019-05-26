using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using Procoder.Configurations;
using Procoder.DTO;
using Procoder.Models;
using Procoder.ModelServices.Interface;
using Procoder.Repositories;

namespace Procoder.ModelServices
{
    public class UserService : IUserService
    {
        private readonly AppSettings appSettings;
        private readonly IProcoderDb procoderDb;

        public UserService(IOptions<AppSettings> appSettings, IProcoderDb procoderDB)
        {
            this.procoderDb = procoderDB;
            this.appSettings = appSettings.Value;
        }

        public UserDto LogInAndTakeUser(string email, string password)
        {
            if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password))
            {
                new NotImplementedException("Username or password is wrong");
            }

            var user = procoderDb.UserRepository.GetByEmail(email);

            if (user != null && PasswordHasher.Verify(password, user.Password))
            {
                return null;
            }

            return new UserDto()
            {
                Id = user.Id,
                Name = user.Name,
                Token = TokenFactory.Get(email, appSettings.Secret)
            };
        }

        public void SignOut()
        {
            throw new NotImplementedException();
        }

        public void SignUp(string name, string email, string password)
        {
            if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password))
            {
                throw new NotImplementedException("Credential is not complete");
            }

            if (password.Length < 10)
                throw new NotImplementedException("Password is weak");

            if (procoderDb.UserRepository.IsExist(email))
                throw new NotImplementedException("User already exist");

            User newUser = new User()
            {
                Name = name,
                Email = email,
                Password = PasswordHasher.Hash(password),
                DateRegistration = DateTime.Now,
                IsEmailValid = false
            };
            procoderDb.UserRepository.Create(newUser);
            procoderDb.Save();

            IEmailService emailService = new EmailService(appSettings);
            int timeout = appSettings.STMPConnection.TimeOut;
            emailService.ConfirmEmail(email, appSettings.EmailText);
        }
    }
}
