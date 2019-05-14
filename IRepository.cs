using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Procoder
{
    interface IRepository<T> : IDisposable
    {
        void Create(T item);
        void Update(T item);
        void Save();
    }
}
