using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Procoder.Models;

namespace Procoder.ModelServices.Interface
{
    public interface IMapService
    {
        void ChangeMapsCategory(int userId, string oldName, string newName);
        void ChangeCategory(int mapId, string newName);
        void ChangeStatus(int mapId, string newStatus);
        void DeleteUserTrashMaps(int userId);
        ICollection<Map> GetAllUserMaps(int userId);
        Map GetById(int Id);
        void Save(object jsonFile, int userId, int mapId);
        Map Create(int userId);
        void Delete(int userId, int mapId);
    }
}
