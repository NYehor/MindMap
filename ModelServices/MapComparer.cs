using Procoder.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Procoder.ModelServices
{
    public class MapComparer : IEqualityComparer<Node>
    {
        public bool Equals(Node x, Node y)
        {
            //Check whether the compared objects reference the same data.
            if (Object.ReferenceEquals(x, y)) return true;

            //Check whether any of the compared objects is null.
            if (Object.ReferenceEquals(x, null) || Object.ReferenceEquals(y, null))
                return false;

            //Check whether the products' properties are equal.
            return x.Id == y.Id;
        }

        public int GetHashCode(Node node)
        {
            //Check whether the object is null
            if (Object.ReferenceEquals(node, null)) return 0;

            //Get hash code for the Name field if it is not null.
            int hashNodeId = node.Id == null ? 0 : node.Id.GetHashCode();

            //Calculate the hash code for the product.
            return hashNodeId;
        }
    }
}
