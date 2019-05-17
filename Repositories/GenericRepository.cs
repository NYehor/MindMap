using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace Procoder.Repositories
{
    public class GenericRepository<TEntity> : IGenericRepository<TEntity> where TEntity : class
    {
        protected readonly ProcoderContext Context;

        public GenericRepository(ProcoderContext Context)
        {
            this.Context = Context;
        }

        public IQueryable<TEntity> GetAll()
        {
            return Context.Set<TEntity>().AsNoTracking();
        }

        public void Create(TEntity entity)
        {
            Context.Set<TEntity>().AddAsync(entity);
        }

        public void Update(TEntity entity)
        {
            Context.Set<TEntity>().Update(entity);
        }
    }
}
