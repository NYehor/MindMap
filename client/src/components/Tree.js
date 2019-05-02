import React, { Component } from 'react'
import * as d3 from "d3";
import { TREE, NODE } from '../utils/treeDimensions';
import keyCodes from '../utils/keyCodes';

export default class Tree extends Component {

    constructor() {
        super();
        this.state = {
            size: {
                width: 1000,
                height: 600,
            }
        }    

        this.selectedNode = [];
        this.isEditableTree = false;


        this.bindDocumentHandlers();
        this.count = 0;
    }

    bindDocumentHandlers() {

        document.addEventListener('keydown', (e) => {
            e.preventDefault();
            console.log(e.which);

            switch (e.which) {

                case keyCodes.ENTER:
                
                    break;

                case keyCodes.TAB: 
                {
                    const parent = this.selectedNode[0];
                    console.log(parent);
                    const node = {
                        name: 'Node ' + ++this.count
                    };
                    this.props.addNode(parent.id, node);
                    break; 
                }
                case keyCodes.DELETE:
                    const node = this.selectedNode[0].data;
                    console.log(node);
                    this.props.removeNode(node);
                    break;

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
            .classed('node--selected', (d) => {
                if (this.selectedNode.length) {
                    const [ , node] = this.selectedNode;
                    d3.select(node).classed('node--selected', true);
                }
            })
            .on('click', (d, i, nodes) => {
                console.log(d);
                d3.select(nodes[i]).classed('node--selected', true);
                this.selectedNode = [d, nodes[i]];
            })
            .append('xhtml:div')
                .attr('class', 'editable')
                .html(d => d.data.name);
                // .html(mdHtml.render(newSource));

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
                .classed('node--selected', (d) => {
                    if (this.selectedNode.length) {
                        const [ , node] = this.selectedNode;
                        d3.select(node).classed('node--selected', true);
                    }
                })
                .on('click', (d, i, nodes) => {
                    console.log(d);
                    d3.select(nodes[i]).classed('node--selected', true);
                    this.selectedNode = [d, nodes[i]];
                    this.all = nodes;
                    console.log(nodes_data)
    
                })    
                .select('div')
                    .attr('class', 'editable')
                    .html(d => d.data.name);
    
        // mdInit();
        // console.log(source);
        // const newSource = source.replace(/<br>/g, '\n');


    }

    splitTree(data) {

        let leftBranch = [], 
            rightBranch = [];

        // debugger;
        const root = data.filter(node => node.name === this.props.treeName)[0];
        const nodes = data.filter(node => node.name !== this.props.treeName);
console.log(root)
        const firstLevelNodes = nodes.filter(node => {
            console.log([root.id, node.parentID])
            return node.parentID === root.id
        });
        const nextLevelNodes = nodes.filter(node => node.parentID !== root.id);

        const splitIndex = Math.ceil(firstLevelNodes.length / 2);

        rightBranch = firstLevelNodes.slice(0, splitIndex);
        leftBranch = firstLevelNodes.slice(splitIndex);

        console.log(rightBranch);
        console.log(leftBranch);

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
