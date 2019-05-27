using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Procoder.Models;
using Procoder.ModelServices.Interface;
using Procoder.Repositories;

namespace Procoder.ModelServices
{
    public class MapService : IMapService
    {
        private readonly IProcoderDb procoderDb;

        public MapService(IProcoderDb procoderDB)
        {
            this.procoderDb = procoderDB;
        }

        public void ChangeCategory(int mapId, string newName)
        {
            var map = procoderDb.MapRepository.GetById(mapId);
            map.Category = newName;

            procoderDb.MapRepository.Update(map);
            procoderDb.Save();
        }

        public void ChangeMapsCategory(int userId, string oldName, string newName)
        {
            var maps = procoderDb.MapRepository.GetUserMapsByCategory(userId, oldName);
            foreach (var map in maps)
            {
                map.Category = newName;
                procoderDb.MapRepository.Update(map);
            }

            procoderDb.Save();
        }

        public void ChangeStatus(int mapId, string newStatus)
        {
            var map = procoderDb.MapRepository.GetById(mapId);
            map.Status = newStatus;

            procoderDb.MapRepository.Update(map);
            procoderDb.Save();
        }

        public Map Create(int userId)
        {
            var user = procoderDb.UserRepository.GetById(userId);

            if (user != null)
            {
                var newMap = new Map()
                {
                    CreateData = DateTime.Now,
                    UserId = user.Id,
                    Nodes = new List<Node>()
                };

                procoderDb.MapRepository.Create(newMap);
                procoderDb.Save();

                return newMap;
            }

            throw new NotImplementedException();
        }

        public void Delete(int userId, int mapId)
        {
            procoderDb.MapRepository.Delete(userId, mapId);
            procoderDb.Save();
        }

        public void DeleteUserTrashMaps(int userId)
        {
            var maps = procoderDb.MapRepository.GetUserMapsByStatus(userId, "trash");
            foreach (var map in maps)
            {
                procoderDb.MapRepository.Delete(map);
            }

            procoderDb.Save();
        }

        public ICollection<Map> GetAllUserMaps(int userId)
        {
            var user = procoderDb.UserRepository.GetById(userId);

            if (user.Maps != null)
            {
                return procoderDb.MapRepository.GetAllMaps(userId);
            }

            return new List<Map>();
        }

        public Map GetById(int Id)
        {
            return procoderDb.MapRepository.GetById(Id);
        }

        public void Save(object jsonFile, int userId, int mapId)
        {
            string jsFile = Convert.ToString(jsonFile);
            if (jsFile == string.Empty || jsFile == null)
                throw new NotImplementedException();

            Map map = JsonConvert.DeserializeObject<Map>(jsFile);
            map.LastEdit = DateTime.Now;
            map.UserId = userId;

            Map existMap = procoderDb.MapRepository.GetById(mapId);

            var newNodes = map.Nodes.Except(existMap.Nodes, new MapComparer());
            var oldNodes = map.Nodes.Intersect(existMap.Nodes, new MapComparer());

            foreach (var node in newNodes)
            {
                node.MapId = map.Id;
                procoderDb.NodeRepository.Create(node);
                procoderDb.Save();
            }

            foreach (var node in oldNodes)
            {
                node.MapId = map.Id;
                procoderDb.NodeRepository.Update(node);
                procoderDb.Save();
            }

            if (procoderDb.MapRepository.IsExist(map.Id))
            {
                procoderDb.MapRepository.Update(map);
                procoderDb.Save();
            }
        }
    }
}
