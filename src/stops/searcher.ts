import Edge from "../interfaces/edge";
import Stop from "../interfaces/stop";
import { Graph } from "./graph";

/**
 * Dijkstra's Algorithm
 * Based on https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm
 * and https://pl.wikipedia.org/wiki/Algorytm_Dijkstry
 */
class Searcher {

    graph: Graph;

    constructor( graph: Graph ) {
        this.graph = graph;
    }

    /**
     * Find shortest way between two stops
     * @param source - Stop
     * @param target - Stop
     */
    public findShortestWay = (source: Stop, target: Stop) => {
        const distances: number[] = [];
        const prev: (number|undefined)[] = [];

        // Piority Queue
        const PQ: Edge[][] = [this.graph.stops[source.id].edges];

        // Stop with lowest piority
        let u: Edge[];

        for(const stop of this.graph.stops) {
            distances[stop.id] = Infinity;
            prev[stop.id] = undefined;
        }

        distances[source.id] = 0;

        while (PQ.length > 0) {
            u = PQ.shift()!;

            for(const neighbor of u) {
                const alt: number = distances[neighbor.from] + neighbor.distance;
                if(distances[neighbor.to] > alt) {
                    distances[neighbor.to] = alt;
                    prev[neighbor.to] = neighbor.from;
                    PQ.push(this.graph.stops[neighbor.to].edges);
                }
            }
        }
        return {
            dist: distances[target.id],
            prev
        };
    }

    /**
     * Find stops on path by given array
     * @param prev - Number[] - IDs of stops on path
     * @param source - Number - ID of source stop
     */
    findStopsOnPath(prev: (number|undefined)[], source: number, target: number): number[] {
        const path: number[] = [];
        let currentStop: number = target;
        if(prev[currentStop] || prev[currentStop] === 0) {
            while(currentStop !== source) {
                path.push(currentStop);
                currentStop = prev[currentStop]!;
            }
            path.push(source);
            path.reverse();
        }
        return path;
    }
}

export { Searcher };