import React, { Component } from 'react'
import * as d3 from "d3";
import PerfectScrollbar from 'perfect-scrollbar';

import DomModal from '../services/Modal';
import { NODE } from '../utils/treeDimensions';
import { Caret } from '../services/Caret';
import keyCodes from '../utils/keyCodes';
import { md, sanitize } from '../services/markdown';

export default class Tree extends Component {

    constructor() {
        super();
        this.state = {
            size: {
                width: screen.width,
                height: 700,
            }
        }    

        this.selected = {
            d3Node: null,
            domNode: null,
            on() {
                d3.select(this.domNode).classed('node--selected', true);
            },
            off() {
                if (this.domNode) {
                    d3.select(this.domNode).classed('node--selected', false);
                }   
            },
            set(d3Node, domNode) {
                this.d3Node = d3Node;
                this.domNode = domNode;
            }
        };

        this.isEditableTree = false;
        this.perfectScrollbars = new Map();

        this.bindDocumentHandlers();
    }

    bindDocumentHandlers() {

        document.addEventListener('paste', this.onPasteHandler);

        document.addEventListener('keyup', (e) => {

            const charList = `abcdefghijklmnopqrstuvwxyz
                              0123456789
                              !@#$%^&*()_-+?><{}[]\|?/
                              "' `;
            console.log(e.key.toLowerCase());

            if (e.which === keyCodes.BACKSPACE) {
                const { domNode } = this.selected;
                const editable = domNode.querySelector('.editable');
                const content = editable.innerHTML.replace(/(<br>$)+/, '');
                console.log(content);
                const wrapper = domNode.closest('.node');
                wrapper.style.height = `${NODE.height(content)}px`;
                wrapper.style.width = `${NODE.width(content)}px`;
            }            
            if (charList.includes(e.key.toLowerCase())) {
                const { domNode } = this.selected;
                const editable = domNode.querySelector('.editable');
                const content = editable.innerHTML;
                console.log(content);
                const wrapper = domNode.closest('.node');
                wrapper.style.width = `${NODE.width(content)}px`;    
            }
            this.updateCustomNodeScrollbars();
        });

        document.addEventListener('keydown', (e) => {
            // console.log(e.which);
            // console.log(e.keyCode);

            switch (e.which) {

                case keyCodes.ENTER: 
                {
                    // ADD NEW LINE AT THE EDITING NODE
                    if(this.isEditableTree) {
                        const { domNode } = this.selected;
                        const editable = domNode.querySelector('.editable');
                        const content = editable.innerHTML;
                        console.log(content);
                        const wrapper = domNode.closest('.node');
                        console.log(`${NODE.height(content)}px`)
                        wrapper.style.height = `${NODE.height(content)}px`;
                        break; 
                    }
                    // ENTER EDITABLE MODE
                    else {
                        e.preventDefault();
                        this.isEditableTree = true;
                        const { d3Node, domNode } = this.selected;
                        const editableEl = domNode.querySelector('.editable');
                        editableEl.setAttribute('contentEditable', 'true');
                        console.log(d3Node.data.content);
                        editableEl.innerHTML = d3Node.data.content;
                        Caret.set(editableEl);
                        break;    
                    }
                }               

                // CREATE NEW NODE FROM PARENT
                case keyCodes.TAB: 
                {       
                    e.preventDefault();
                    if (!this.isEditableTree) {
                        const parent = this.selected.d3Node;
                        const nodeContent = '## Hello world!';
                        this.props.addNode(parent.id, nodeContent);
                    }
                    break;     
                }
                // DELETE SELECTED NODE
                case keyCodes.DELETE:
                {
                    if (!this.isEditableTree) {
                        e.preventDefault();
                        const {d3Node: {data: node}} = this.selected;
                        this.props.removeNode(node);    
                    }
                    break;
                }
                // EXIT EDITABLE MODE AND SAVE NODE
                case keyCodes.ESC: 
                {
                    e.preventDefault();
                    if (this.isEditableTree) {
                        this.isEditableTree = false;
                        const {d3Node: {data}, domNode} = this.selected;
                        const editable = domNode.querySelector('.editable');
                        editable.setAttribute('contenteditable', null);
                        const content = editable.innerHTML.replace(/<br>$/, '');
                        this.props.updateNode(data, content);    
                    }
                    break;
                }
                default:
                    break;
            }
        });
    }


    onPasteHandler(e) {
        e.preventDefault();
        const text = e.clipboardData.getData('text/plain');
        console.log('Got pasted text: ', text.length);
        if (text.length > 1000) {

        }
        document.execCommand("insertHTML", false, text);      
    }


    updateEditableNode() {
        if (this.isEditableTree) {
            const { d3Node, domNode } = this.selected;
            const editable = domNode.querySelector('.editable');
            editable.innerHTML = d3Node.data.content;
            editable.setAttribute('contentEditable', 'true');
            Caret.set(editable);
        }
    }

    componentWillUnmount() {
        // remove all document event handlers
        document.removeEventListener('paste', this.onPasteHandler);

    }

    drawBranch(data, direction) {

        const { size } = this.state;
        console.log(data);

        // init tree
        const stratify = d3.stratify()
                            .id(data => data.id)
                            .parentId(data => data.parentID);

        const tree = d3.tree().nodeSize([NODE.container.width + 30, NODE.container.height + 30]);

     
        const branchEl = d3.select(`.branch-${direction}`)
                            .attr('transform', `translate(${size.width / 2},0)`);

        const stratified = stratify(data);
        const treeData = tree(stratified);
        const nodes = treeData.descendants();
        const edges = treeData.links();

        // set updated selected object
        if (this.selected.d3Node 
            && nodes.some(n => n.id === this.selected.d3Node.id)) {
            const { domNode, d3Node } = this.selected;
            const updated = nodes.find(n => n.id === d3Node.id) 
            this.selected.set(updated, domNode);
        }
        console.log(this.selected);
        

        // console.log(nodes)

        nodes.forEach(function (d) {
            switch (d.depth) {
                case 0:
                    d.y = d.depth * 500;
                    break;
                case 1:
                    d.y = d.depth * 400;
                    break;
                default:
                    d.y = d.depth * 400;
                    break;
            }
            // d.y = d.depth * 500;
        });

        // set root node as dead center
        nodes[0].x = size.height / 2;

        // get edges selection 
        {
            const edge = branchEl.selectAll('.edge').data(edges);

            edge.exit().remove();

            edge.enter()
                .append('path')
                .attr('class', 'edge')
                .attr('fill', 'none')
                .attr('stroke', '#aaa')
                .attr('stroke-width', 2)
                .merge(edge)
                .attr('d', d3.linkHorizontal().x(d => {
                    return (direction === 'right') ? d.y : -d.y;
                }).y(d => d.x))
                .lower();
        }       
        
        
        // get nodes selections    
        const node = branchEl
                        .selectAll('.node_group')
                        .data(nodes, (d) => d.data.id);


        // console.log(node);   

        node.exit().remove();   

        node    
            .enter()
            .append('g')
            .attr('class', 'node_group')
            .attr('transform', d => {
                if (direction === 'right') {
                    return `translate(${d.y}, ${d.x})`;
                }
                else {
                    return `translate(${-d.y}, ${d.x})`;
                }
            })                                
            .append('foreignObject')
            .html((d, i, nodes) => {
                // init scrollbar
                const scrollbar = new PerfectScrollbar(nodes[i]);
                this.perfectScrollbars.set(d.data.id, scrollbar);                
            })
            .attr('class', 'node')
            .style('height', d => NODE.height(d.data.content))
            .style('width', d => NODE.width(d.data.content))
            .style('transform', d => {
                const x = NODE.width(d.data.content) / 2;
                const y = NODE.height(d.data.content) / 2;
                return `translate(${-x}px, ${-y}px)`
            })
            .on('click', (d, i, nodes) => {
                this.selected.off();
                this.selected.set(d, nodes[i]);
                this.selected.on();
            })
            .append('xhtml:div')
                .attr('class', 'editable')
                .html(d => {
                    const source = sanitize(d.data.content);
                    console.log(source)
                    return md.render(source);
            });
                

            node    
                .attr('class', 'node_group')
                .attr('transform', d => {
                    if (direction === 'right') {
                        return `translate(${d.y}, ${d.x})`;
                    }
                    else {
                        return `translate(${-d.y}, ${d.x})`;
                    }
                })                                
                .select('foreignObject')
                .attr('class', 'node')
                .style('height', d => NODE.height(d.data.content))
                .style('width', d => NODE.width(d.data.content))
                .style('transform', d => {
                    const x = NODE.width(d.data.content) / 2;
                    const y = NODE.height(d.data.content) / 2;
                    return `translate(${-x}px, ${-y}px)`
                })
                .classed('node--selected', (d, i, nodes) => {
                    this.selected.on();
                })
                .on('click', (d, i, nodes) => {
                    this.selected.off();
                    this.selected.set(d, nodes[i]);
                    this.selected.on();
                })
                .on('mousedown', () => {
                    const largeSnippet = d3.event.target.closest('.hljs');
                    if (largeSnippet) {
                        const html = largeSnippet.cloneNode(true);
                        DomModal.init(html);                        
                    }
                    const collapsedSnippet = d3.event.target;
                    if (collapsedSnippet.classList.contains('collapsed-code')) {
                       const snippet = collapsedSnippet.querySelector('.hljs');
                       const html = snippet.cloneNode(true);
                       DomModal.init(html);
                    }
                })
                .select('div')
                    .attr('class', 'editable')
                    .html(d => {
                        const source = sanitize(d.data.content);     
                        console.log(source)
                        return md.render(source);
                });
        
    }

    splitTree(data) {

        let leftBranch = [], 
            rightBranch = [];

        // const root = data.filter(node => node.name === this.props.treeName)[0];
        // const nodes = data.filter(node => node.name !== this.props.treeName);

        const root = data.filter(node => node.parentID === null)[0];
        const nodes = data.filter(node => node.parentID !== null);

        const firstLevelNodes = nodes.filter(node => node.parentID === root.id);
        const nextLevelNodes = nodes.filter(node => node.parentID !== root.id);

        const splitIndex = Math.ceil(firstLevelNodes.length / 2);

        rightBranch = firstLevelNodes.slice(0, splitIndex);
        leftBranch = firstLevelNodes.slice(splitIndex);

        nextLevelNodes.forEach(next => {
            if (leftBranch.some(node => node.id === next.parentID)) {
                leftBranch.push(next);
            }
            else {
                rightBranch.push(next);
            }
        });

        leftBranch = [root, ...leftBranch];
        rightBranch = [root, ...rightBranch];

        return { leftBranch, rightBranch };
    }


    updateTree() {
        d3.select(this.svg).call(d3.zoom()
                        .scaleExtent([1/30, 4])
                        .on("zoom", () => d3.select('#tree-canvas').attr("transform", d3.event.transform)))
                        .on('dblclick.zoom', null);

        const { leftBranch, rightBranch } = this.splitTree(this.props.nodes);
        this.drawBranch(leftBranch, 'left');
        this.drawBranch(rightBranch, 'right'); 
        this.updateEditableNode();
    }

    componentDidMount() {
        console.log('%c TREE: componentDidMount ', 'color: green; background-color: LightGreen; font-weight: bold')
        this.props.addNode(this.props.treeName);
    }

    componentDidUpdate() {
        console.log('%c TREE: componentDidUpdate ', 'color: green; background-color: LightGreen; font-weight: bold;')
        this.updateTree();
    }

    updateCustomNodeScrollbars() {
        if (this.perfectScrollbars.size !== 0) {
            for (const[ , nodeScrollbar] of this.perfectScrollbars) {
                nodeScrollbar.update();
            }    
        }
    }

    render() {
        console.log('%c TREE: render ', 'color: green; background-color: LightGreen; font-weight: bold;')


        const {size} = this.state;
        return (
            <div id='procoder-tree-canvas'>

                <svg id='procoder-tree'
                     width='100%'
                     height={size.height} 
                     ref={el => this.svg = el}>

                        <g id='tree-canvas'
                           ref={el => this.svgGroup = el}>

                           <g className='branch-left'></g>
                           <g className='branch-right'></g>

                        </g>
                </svg>

            </div>
        )
    }
}
