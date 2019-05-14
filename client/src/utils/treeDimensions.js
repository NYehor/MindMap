export const TREE = {
    width: 1500,
    height: 800,
    marginVertical: 100,
    marginHorizontal: 100
};

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
        height: 150
    },
    width(content) {
        // d => d.data.content;
        const lines = content.replace(/<br>/g, '\n').split('\n');
        const lengthes = lines.map(line => line.length);
        const maxLineLength = Math.max(...lengthes);
        return maxLineLength * NODE.letterWidth + NODE.margin.left + NODE.margin.right;    
    },
    height(content) {
        const lines = content.replace(/<br>/g, '\n').split('\n');
        return lines.length * NODE.lineHeight + 10; 
    }
};