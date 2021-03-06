import Graph from './graph';
import { expect } from 'chai';
import WeightedGraph from './weighted-graph';
import { dijkstra } from './dijkstra';

describe('test graph', () => {

    let graph: Graph<string>;
    let vertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
    let edges = {
        'A': ['B', 'C', 'D'],
        'B': ['E', 'F'],
        'C': ['D', 'G'],
        'D': ['G', 'H'],
        'E': ['I']
    };

    beforeEach(() => {
        graph = new Graph<string>();

        /**
         *                  A
         *                / \  \
         *              B   C - D
         *             / \   \ /  \
         *            E   F   G    H
         *           /
         *          I
         * */
        vertices.map(vertex => graph.addVertex(vertex));

        Object.keys(edges).map(src =>
            edges[src].map(dest =>
                graph.addEdge(src, dest)
            )
        );
    });

    it('should be undirected graph', () => {
        expect(graph.vertexCount()).equal(vertices.length);

        expect(graph.edgeCount()).equal(10);

        // adjacency list
        expect(graph.toArray()).deep.equals([
            ['A', 'B', 'C', 'D'],
            ['B', 'A', 'E', 'F'],
            ['C', 'A', 'D', 'G'],
            ['D', 'A', 'C', 'G', 'H'],
            ['E', 'B', 'I'],
            ['F', 'B'],
            ['G', 'C', 'D'],
            ['H', 'D'],
            ['I', 'E']
        ]);
    });

    it('should breadth first search', () => {
        let expected = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
        let counter = 0;

        graph.bfs(vertices[0], visited => expect(visited).equal(expected[counter++]));
    });

    it('should shortest path', () => {
        const { distances, predecessors } = graph.bfs(vertices[0]);

        expect(distances).to.deep.equal({ A: 0, B: 1, C: 1, D: 1, E: 2, F: 2, G: 2, H: 2, I: 3 });
        expect(predecessors).to.deep.equal({ A: null, B: 'A', C: 'A', D: 'A', E: 'B', F: 'B', G: 'C', H: 'D', I: 'E' });
    });

    it('should depth first search', () => {
        let expected = ['A', 'B', 'E', 'I', 'F', 'C', 'D', 'G', 'H'];
        let counter = 0;

        graph.dfs(visited => expect(visited).equal(expected[counter++]));
    });
});

describe('test weighted graph', () => {
    let graph: WeightedGraph<string>;
    let vertices = ['A', 'B', 'C', 'D', 'E', 'F'];

    beforeEach(() => {
        /**    weighted graph
         *
         *            ④
         *         B ---- D
         *    ②/  | \    |  \②
         *   A   ②| ②\  |③  F
         *   ④\   |    \ |  /②
         *       C -----  E
         *           ③
         * */
        graph = new WeightedGraph<string>();

        vertices.map(vertex => graph.addVertex(vertex));

        //  adjacency matrix
        const matrix = [
            [0, 2, 4, 0, 0, 0],
            [0, 0, 2, 4, 2, 0],
            [0, 0, 0, 0, 3, 0],
            [0, 0, 0, 0, 0, 2],
            [0, 0, 0, 3, 0, 2],
            [0, 0, 0, 0, 0, 0]];

        matrix.map((row, x) => matrix[x].map((weight, y) =>
            graph.addEdge(vertices[x], vertices[y], weight)
        ));
    });

    it('should be weighted directed graph', () => {
        expect(graph.vertexCount()).equal(vertices.length);

        expect(graph.edgeCount()).equal(9);

        expect(graph.reachable('A', 'B')).be.true;
        expect(graph.reachable('B', 'A')).be.false;

        // adjacency list
        expect(graph.toArray()).deep.equal([
            ['A', 'B', 'C'],
            ['B', 'C', 'D', 'E'],
            ['C', 'E'],
            ['D', 'F'],
            ['E', 'D', 'F'],
            ['F']
        ]);

    });

    it('should get shortest path by Dijkstra\'s Algorithm', () => {
        expect(dijkstra(graph, 'A')).deep
            .equals({ 'A': 0, 'B': 2, 'C': 4, 'D': 6, 'E': 4, 'F': 6 });
    });
});
