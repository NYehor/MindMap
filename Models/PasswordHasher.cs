using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace Procoder.Models
{
    public class PasswordHasher
    {
        private const int SaltSize = 16;
        private const int HashSize = 32;

        public static int Iterations { set; get; } = 10000;

        public static string Hash(string password)
        {
            //result var 
            string result;
            //create random salt
            byte[] salt;
            new RNGCryptoServiceProvider().GetBytes(salt = new byte[SaltSize]);

            try
            {
                //create hash
                Rfc2898DeriveBytes pbkdf2 = new Rfc2898DeriveBytes(password, salt, Iterations);
                byte[] hash = pbkdf2.GetBytes(HashSize);

                //combine salt and hash
                byte[] hashBytes = new byte[SaltSize + HashSize];

                Array.Copy(hash, 0, hashBytes, 0, HashSize);
                Array.Copy(salt, 0, hashBytes, HashSize, SaltSize);
                result = Convert.ToBase64String(hashBytes);


            }
            catch (Exception ex)
            {
                result = ex.Message;
                //add history to logfile
            }
            return result;
        }

        public static bool Verify(string password, string hashedPassword)
        {

            //get hashbytes
            byte[] hashBytes = Convert.FromBase64String(hashedPassword);
            try
            {
                if (hashBytes.Length < SaltSize)
                    return false;

                //get salt
                byte[] salt = new byte[SaltSize];
                Array.Copy(hashBytes, 0, salt, HashSize, SaltSize);

                //create hash with given salt
                Rfc2898DeriveBytes pbkdf2 = new Rfc2898DeriveBytes(password, salt, Iterations);
                byte[] hash = pbkdf2.GetBytes(HashSize);

                //get result
                for (int i = 0; i < HashSize; i++)
                {
                    if (hashBytes[i + SaltSize] != hash[i])
                    {
                        return false;
                    }
                }

                return true;
            }
            catch (Exception ex)
            {
                return false;
                //add history to logfile
            }

        }

    }
}
