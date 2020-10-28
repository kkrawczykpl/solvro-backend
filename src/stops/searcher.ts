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
        const prev: any = [];
        // Piority Queue
        let PQ: Stop[] = [];
        // Stop with lowest piority
        let u: Stop;

        for(const stop of this.graph.stops) {
            distances[stop.id] = Infinity;
            prev[stop.id] = undefined;
            PQ.push(stop);
        }
        distances[source.id] = 0;

        while (PQ.length > 0) {
            /* Find Stop with shortest distance to the source which has not yet been visited */
            u = PQ.reduce((min, next): Stop => {
                if(distances[next.id] < distances[min.id]) {
                    min = next;
                }
                return min;
            });

            if (u === target) {
                break;
            }

            // Get rid of "u"
            PQ = PQ.filter(stop => stop !== u);

            // Find neighbors
            const neighbors: Stop[] = u.edges
                .map(edge => edge.to)
                .filter(v => {
                    return PQ.indexOf(v) > -1 ? true: false;
                });

            for(const v of neighbors) {
                const alt: number = distances[u.id] + u.edges.find(edge => edge.to === v)!.distance;
                if(alt < distances[v.id]) {
                    distances[v.id] = alt;
                    prev[v.id] = u.id;
                }
            }
        }
        return {
            dist: distances.slice(0, target.id + 1).pop(),
            prev: prev.slice(0, target.id + 1)
        };
    }

    /**
     * Find stops on path by given array
     * @param prev - Number[] - IDs of stops on path
     * @param source - Number - ID of source stop
     */
    findStopsOnPath(prev: number[], source: number): number[][] {
        const getPrev = (path:any, v:any): any => {
            const next = prev[v]
            if (next) {
                path.push(next);
                return getPrev(path, next);
            } else {
                path.push(source);
                path.reverse()
                return path;
            }
        }
        return prev.map((v, i) => getPrev([i], i) );
    }
}

export { Searcher };