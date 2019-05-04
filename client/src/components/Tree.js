import React, { Component } from 'react'
import * as d3 from "d3";
import { TREE, NODE } from '../utils/treeDimensions';
import keyCodes from '../utils/keyCodes';
import md from '../services/markdown';

export default class Tree extends Component {

    constructor() {
        super();
        this.state = {
            size: {
                width: 1000,
                height: 600,
            }
        }    
        this.md = md;
        console.log(this.md)

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


        this.bindDocumentHandlers();
        this.count = 0;
    }

    bindDocumentHandlers() {

        document.addEventListener('keydown', (e) => {
            console.log(e.which);
            console.log(e.shiftKey)

            switch (e.which) {

                // node creation at the siblings level
                case keyCodes.ENTER: 
                {
                    if (!this.isEditableTree) {
                        e.preventDefault();

                        const node = this.selected.d3Node;
                        const parent = node.parent.data;
                        if (node.height === 0) {
                            const node = {
                                name: 'Node ' + ++this.count
                            };
                            this.props.addNode(parent.id, node);
                        }    
                    }
                    else {
                        const data = this.selected.d3Node.data;
                        const editable = this.selected.domNode;
                        editable.setAttribute('contenteditable', null);
                        const content = editable.querySelector('.editable').innerHTML;
                        console.log(content);
                        this.props.updateNode(data, content);

                        this.isEditableTree = false;

                    }
                    break;
                }               

                case keyCodes.TAB: 
                {
                    e.preventDefault();
                    const parent = this.selected.d3Node;
                    console.log(parent);
                    // const node = {
                    //     name: 'Node ' + ++this.count
                    // };
                    const nodeContent = '## Hello world!';

                    this.props.addNode(parent.id, nodeContent);
                    break; 
                }
                case keyCodes.DELETE:
                {
                    e.preventDefault();
                    const node = this.selected.d3Node.data;
                    console.log(node);
                    this.props.removeNode(node);
                    break;
                }
                case keyCodes.ESC: 
                {
                    // after editing node -> turn off editableMode and save node
                    // the same as clicking on outside of tree
                    break;
                }
                default:
                    break;
            }
        });
    }

    componentWillUnmount() {
        // remove all document event handlers

    }

    drawBranch(data, direction) {

        const SWITCH_INDEX = direction === 'right' ? 1 : -1;
        const { size } = this.state;
        console.log(data);

        // init tree
        const stratify = d3.stratify()
                            .id(data => data.id)
                            .parentId(data => data.parentID);

        const tree = d3.tree()
                        .size([size.height, 
                               SWITCH_INDEX * (size.width - 50) / 2]);
     
        const branchEl = d3.select(`.branch-${direction}`)
                            .attr('transform', `translate(${size.width / 2},0)`);

        const stratified = stratify(data);
        const treeData = tree(stratified);
        const nodes_data = treeData.descendants();
        const edges_data = treeData.links();

        // set root node as dead center
        nodes_data[0].x = size.height / 2;

        console.log(stratified);
        console.log(treeData);
        console.log(nodes_data);


        // get edges selection 
        {
            const edges = branchEl.selectAll('.edge').data(edges_data);

            edges.exit().remove();

            edges.enter()
                .append('path')
                .attr('class', 'edge')
                .attr('fill', 'none')
                .attr('stroke', '#aaa')
                .attr('stroke-width', 2)
                .merge(edges)
                .attr('d', d3.linkHorizontal().x(d => d.y).y(d => d.x))
                .lower();
        }
        
        
        // get nodes selections
    
        const node = branchEl
                        .selectAll('.node_group')
                        .data(nodes_data, (d) => d.data.id);

        console.log(node);   

        node.exit().remove();   

        const str = [this.md.render('# ertetretrt')]

        node    
            .enter()
            .append('g')
            .attr('class', 'node_group')
            .attr('transform', d => `translate(${d.y}, ${d.x})`)                                
            .append('foreignObject')
            .attr('class', 'node')
            .style('height', NODE.height)
            .style('width', d => NODE.width(d))
            .style('transform', d => {
                const x = NODE.width(d) / 2;
                const y = NODE.height / 2;
                return `translate(${-x}px, ${-y}px)`
            })
            .on('click', (d, i, nodes) => {
                console.log(d);
                this.selected.off();
                this.selected.set(d, nodes[i]);
                this.selected.on();
            })
            .on('dblclick', (d, i, nodes) => {
                this.isEditableTree = true;
                console.log(nodes[i]);
                const editableEl = nodes[i].querySelector('.editable');

                editableEl.innerHTML = d.data.content;
                editableEl.setAttribute('contentEditable', 'true');
            })
            .append('xhtml:div')
                .attr('class', 'editable')
                .html((d, i, nodes) => {
                    return this.md.render(d.data.content);
                });
                

            node    
                .attr('class', 'node_group')
                .attr('transform', d => `translate(${d.y}, ${d.x})`)                                
                .select('foreignObject')
                .attr('class', 'node')
                .style('height', NODE.height)
                .style('width', d => NODE.width(d))
                .style('transform', d => {
                    const x = NODE.width(d) / 2;
                    const y = NODE.height / 2;
                    return `translate(${-x}px, ${-y}px)`
                })
                .classed('node--selected', (d, i, nodes) => {
                    this.selected.on();
                })
                .on('click', (d, i, nodes) => {
                    console.log(d);
                    this.selected.off();
                    this.selected.set(d, nodes[i]);
                    this.selected.on();
                })
                .on('dblclick', (d, i, nodes) => {
                    console.log('FROM DBCLICK');
                    this.isEditableTree = true;
                    console.log(nodes[i]);
                    const editableEl = nodes[i].querySelector('.editable');
                    editableEl.innerHTML = d.data.content;
                    editableEl.setAttribute('contentEditable', 'true');
                })    
                .select('div')
                    .attr('class', 'editable')
                    .html((d, i, nodes) => {
                        return this.md.render(d.data.content);
                    });
        
        // mdInit();
        // console.log(source);
        // const newSource = source.replace(/<br>/g, '\n');


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
        const { leftBranch, rightBranch } = this.splitTree(this.props.nodes);
        this.drawBranch(leftBranch, 'left');
        this.drawBranch(rightBranch, 'right');             
    }

    componentDidMount() {
        console.log('%c TREE: componentDidMount ', 'color: green; background-color: LightGreen; font-weight: bold')
        this.props.addNode(this.props.treeName);
        // this.updateTree();
    }

    componentDidUpdate() {
        console.log('%c TREE: componentDidUpdate ', 'color: green; background-color: LightGreen; font-weight: bold;')
        this.updateTree();
    }

    render() {
        console.log('%c TREE: render ', 'color: green; background-color: LightGreen; font-weight: bold;')


        const {size} = this.state;
        return (
            <div id='procoder-tree-canvas'>

                <svg id='procoder-tree'
                     width={size.width + 2 * TREE.marginHorizontal}
                     height={size.height + 2 * TREE.marginVertical} >

                        <g id='tree-canvas'
                           ref={el => this.treeEL = el}
                           style={{
                               transform: `translate(100px, 100px)`
                           }}>

                           <g className='branch-left'
                              style={{
                                  transform: `translate(${size.width / 2},0)`
                              }}></g>

                           <g className='branch-right'
                              style={{
                                  transform: `translate(${size.width / 2},0)`
                              }}></g>

                        </g>
                </svg>

            </div>
        )
    }
}
