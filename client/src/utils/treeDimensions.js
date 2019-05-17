export const NODE = {
    lineHeight: 24,
    letterWidth: 10,
    margin: {
        top: 10,
        bottom: 10,
        left: 5,
        right: 5
    },
    container: {
        width: 250,
        minWidth: 70,
        height: 190
    },
    width(content) {
        const lines = content.replace(/<br>/g, '\n').split('\n');
        const lengthes = lines.map(line => line.length);
        const maxLineLength = Math.max(...lengthes);
        const _w = maxLineLength * NODE.letterWidth + NODE.margin.left + NODE.margin.right;
        return  (_w <= NODE.container.minWidth) ? NODE.container.minWidth :
                (_w > NODE.container.width) ? NODE.container.width : _w;
    },
    height(content) {
        const lines = content.replace(/<br>/g, '\n').split('\n');
        const _h = lines.length * NODE.lineHeight + 10; 
        return (_h > NODE.container.height) ? NODE.container.height : _h;
    }
};