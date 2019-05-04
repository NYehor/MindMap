export const TREE = {
    width: 1500,
    height: 500,
    marginVertical: 100,
    marginHorizontal: 100
};

export const NODE = {
    height: 40,
    letterWidth: 20,
    marginHorizontal: 10,
    width(d) {
        return NODE.marginHorizontal * 2 + d.data.content.length * NODE.letterWidth
    }
};