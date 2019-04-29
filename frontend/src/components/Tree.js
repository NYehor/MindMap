import React, { Component } from 'react'
import * as d3 from "d3";
import { TREE, NODE } from '../utils/treeDimensions';

export default class Tree extends Component {

    constructor() {
        super();
        this.state = {
            size: {
                width: 700,
                height: 500,
            },
        }    

        this.leftBranch = [];
        this.rightBranch = [];

    }

    drawBranch(data, direction) {

        const SWITCH_INDEX = direction === 'right' ? 1 : -1;
        const { size } = this.state;
        console.log(data);

        // init tree
        const stratify = d3.stratify()
                            .id(data => data.node.name)
                            .parentId(data => data.parent.name);

        // const branchEl = this.treeEL.append('g')
        //                     .attr('class', `branch-${direction}`)
        //                     .attr('transform', `translate(${width / 2},0)`);
        const branchEl = d3.select('#tree-canvas').append('g')
                            .attr('class', `branch-${direction}`)
                            .attr('transform', `translate(${size.width / 2},0)`);


        const tree = d3.tree()
                       .size([size.height, SWITCH_INDEX * (size.width - 50) / 2]);

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
        const edges = branchEl
                        .selectAll('.edge')
                        .data(edges_data);

        edges.enter()
                .append('path')
                .attr('class', 'edge')
                .attr('fill', 'none')
                .attr('stroke', '#aaa')
                .attr('stroke-width', 2)
                .attr('d', d3.linkHorizontal().x(d => d.y).y(d => d.x));
        
        // get nodes selections
        const nodes = branchEl
                        .selectAll('.node_group')
                        .data(nodes_data);

        const node_group = nodes
                            .enter()
                            .append('g')
                            .attr('class', 'node_group')
                            .attr('transform', d => `translate(${d.y}, ${d.x})`);

        const node_wrapper = node_group.append('foreignObject')
                                        .attr('class', 'node')
                                        .style('height', NODE.height)
                                        .style('width', d => NODE.width(d))
                                        .style('transform', d => {
                                            const x = NODE.width(d) / 2;
                                            const y = NODE.height / 2;
                                            return `translate(${-x}px, ${-y}px)`
                                        });

        // mdInit();
        // console.log(source);
        // const newSource = source.replace(/<br>/g, '\n');
            
        node_wrapper.append('xhtml:div')
                    .attr('class', 'editable')
                    .html(d => d.data.node.name);
                    // .html(mdHtml.render(newSource));


    }

    splitTree() {
        const data = this.props.data;
        // remove temporaty root node as supposed its a first node
        // const nodes = data.slice(1);
        // or
        const nodes = data.filter(({node}) => node.name !== this.props.treeName);
        const root = data.filter(({node}) => node.name === this.props.treeName);

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
        // this.props.addNode(this.props.treeName);
        this.updateTree();
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

                        </g>
                </svg>

            </div>
        )
    }
}
