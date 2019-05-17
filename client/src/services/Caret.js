export const Caret = {
    set(parent) {
        console.log(parent.innerHTML);
        // console.log(parent.innerText);

        const textNode = parent.lastChild;
        const textOffset = textNode.length;
        console.log([textNode, textOffset]);

        const range = document.createRange();
        range.setStart(textNode, textOffset);
        range.collapse(true);

        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
    },
    get() {
        const cursor = document.getSelection();
        console.log(cursor);
    }
}
