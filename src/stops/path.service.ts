import { Link } from '../utils/utils';
import * as city from '../utils/solvro_city.json';
import { Graph } from './graph';
import { StopsService } from './stops.service';
import { Node } from '../utils/utils';
import Stop from '../interfaces/stop';
import { Searcher } from './searcher';

class PathService {
    stopsService: StopsService;
    graph: Graph;

    constructor() {
        this.stopsService = new StopsService();
        this.graph = new Graph();
    }

    /**
     * Find All Paths
     * Returns JSON array of Links.
     *
     * @returns Link Array
     */
    async findAll(): Promise<Link[]> {
        let paths: Link[] = [];
        if (city.links && city.links.length) {
            paths = city.links;
        }
        return paths;
    }

    /**
     * Find Paths between two stops, because two or more stops
     * may have the same name.
     * @param source - String - Path name
     * @param target - String - Target name
     * @returns Object with data about possible paths.
     */
    async findPaths(source: string, target: string): Promise<object[]> {
        const possiblePaths = [];
        const sameSource: Node[] = await this.stopsService.findStopsByName(source);
        const sameTarget: Node[] = await this.stopsService.findStopsByName(target);
        if(sameSource.length && sameTarget.length) {
            for(const src of sameSource) {
                for(const trg of sameTarget) {
                    const path = await this.findShortestPath(src.id, trg.id);
                    possiblePaths.push(path);
                }
            }
        }
        return possiblePaths;
    }

    /**
     * Init graph with providen stops and links
     */
    async initGraph(): Promise<Graph> {
        const nodes: Node[] = await this.stopsService.findAll();
        const edges: Link[] = await this.findAll();
        const stops: Pick<Stop, "id" | "name">[] = nodes.map((stop) => { return {"id": stop.id, "name": stop.stop_name} });
        stops.forEach((v) => this.graph.addStop(v));
        edges.forEach(e => this.graph.addEdge(e.source, e.target, e.distance));
        return this.graph;
    }

    /**
     * Find shortest path between two  stops
     * @param source - Number - ID of source stop
     * @param target - Number - ID of target stop
     */
    async findShortestPath(source: number, target: number): Promise<object>{
        await this.initGraph();
        const sourceStop: Stop | undefined = this.graph.getStop(source);
        const targetStop: Stop | undefined = this.graph.getStop(target);
        if(sourceStop && targetStop) {
            const searcher = new Searcher(this.graph);
            const result = searcher.findShortestWay(sourceStop, targetStop);
            const path = searcher.findStopsOnPath(result.prev, sourceStop.id).pop();
            const resultStops: object[] = path!.map(s => { const st = this.graph.getStop(s); return { "name": st?.name || "No name found", "id": st?.id } } );
            if(result.dist === Infinity) {
                return {
                    status: false,
                    from: sourceStop.id,
                    to: targetStop.id,
                    msg: "No connection possible between providen stops",
                    path: {
                        stops: [],
                    }
                }
            } else{
                resultStops.shift();
                return {
                    status: true,
                    from: sourceStop.id,
                    to: targetStop.id,
                    path: {
                        distance: result.dist,
                        stops: resultStops,
                    }
                }
            }
        }
        return {status: false, msg: "An error occurred, no such stops were found"};
    }
}

export { PathService };