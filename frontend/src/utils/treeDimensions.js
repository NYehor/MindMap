export const TREE = {
    width: 1500,
    height: 500,
    marginVertical: 100,
    marginHorizontal: 100
};

export const NODE = {
    height: 35,
    letterWidth: 9,
    marginHorizontal: 10,
    width(d) {
        return NODE.marginHorizontal * 2 + d.data.node.name.length * NODE.letterWidth
    }
};