import React, { Component } from 'react'
import * as d3 from "d3";
import { TREE, NODE } from '../utils/treeDimensions';

export default class Tree extends Component {

    constructor() {
        super();
        this.state = {
            size: {
                width: 1000,
                height: 500,
            }
        }    

        this.leftBranch = [];
        this.rightBranch = [];
        this.selectedNode = [];
        this.isEditableTree = false;


        this.bindDocumentHandlers();
        this.count = 0;
    }

    bindDocumentHandlers() {

        document.addEventListener('keydown', (e) => {
            e.preventDefault();
            switch (e.which) {
                case 13:
                    
                    break;
                case 9:
                const prevNode = this.selectedNode[0];
                console.log(prevNode);
                const parent = prevNode.parent === null ? this.props.treeName : prevNode.data.node.name;
                const node = {
                    name: 'werewrewrwer' + ++this.count
                };
                this.props.addNode(parent, node)
                    console.log();
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
                            .id(data => data.node.name)
                            .parentId(data => data.parent.name);

        const tree = d3.tree()
                        .size([size.height, 
                               SWITCH_INDEX * (size.width - 50) / 2]);
     

        // const branchEl = d3.select(this.treeEL).append('g')
        //                     .attr('class', `branch-${direction}`)
        //                     .attr('transform', `translate(${size.width / 2},0)`);

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
                        .data(nodes_data, (d) => d.data.node.name);

        console.log(node);        

                        node    
                            .enter()
                            .append('g')
                            .attr('class', 'node_group')
                            .merge(node)
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
                    .html(d => d.data.node.name);
                    // .html(mdHtml.render(newSource));


        // mdInit();
        // console.log(source);
        // const newSource = source.replace(/<br>/g, '\n');

        node.exit().remove();   

    }

    splitTree() {
        const data = this.props.data;
        const root = data.filter(({node}) => node.name === this.props.treeName);
        const nodes = data.filter(({node}) => node.name !== this.props.treeName);

        let firstLevelNodes = [],
            nextLevelNodes = [];

        nodes.map(obj => {
            if (obj.parent.name === this.props.treeName) {
                firstLevelNodes.push(obj);
            }
            else {
                nextLevelNodes.push(obj);
            }
        });
        const splitIndex = Math.ceil(firstLevelNodes.length / 2);

        this.leftBranch = firstLevelNodes.slice(0, splitIndex);
        this.rightBranch = firstLevelNodes.slice(splitIndex);

        nextLevelNodes.forEach(obj => {
            if (this.leftBranch.some(({node}) => node.name === obj.parent.name)) {
                this.leftBranch.push(obj);
            }
            else {
                this.rightBranch.push(obj);
            }
        });

        this.leftBranch = [...root, ...this.leftBranch];
        this.rightBranch = [...root, ...this.rightBranch];
    }


    updateTree() {
        this.splitTree();
        this.drawBranch(this.leftBranch, 'left');
        this.drawBranch(this.rightBranch, 'right');             
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
