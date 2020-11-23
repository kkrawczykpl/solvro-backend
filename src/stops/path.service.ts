import { Link } from '../utils/utils';
import * as city from '../utils/solvro_city.json';
import { Graph } from './graph';
import { StopsService } from './stops.service';
import { Node } from '../utils/utils';
import Stop from '../interfaces/stop';
import { Searcher } from './searcher';
import PathResponse from '../utils/pathResponse.interface';

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
     * Find Path between two stops
     * @param source - String - Source Stop ID
     * @param target - String - Target Stop ID
     * @returns Object with data about possible paths.
     */
    async findPath(source: number, target: number): Promise<PathResponse[]> {
        const paths = [];
        const sourceStop = await this.stopsService.findStopById(source);
        const targetStop = await this.stopsService.findStopById(target);
        if(sourceStop && targetStop) {
            const path = await this.findShortestPath(source, target);
            paths.push(path);
        }
        return paths;
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
    async findShortestPath(source: number, target: number): Promise<PathResponse>{
        await this.initGraph();
        const sourceStop: Stop | undefined = this.graph.getStop(source);
        const targetStop: Stop | undefined = this.graph.getStop(target);
        if(sourceStop && targetStop) {
            if(sourceStop === targetStop) {
                return {
                    status: false,
                    from: sourceStop.id,
                    to: targetStop.id,
                    msg: "The same stop was chosen."
                };
            }

            const searcher = new Searcher(this.graph);
            const result = searcher.findShortestWay(sourceStop, targetStop);
            const path = searcher.findStopsOnPath(result.prev, sourceStop.id, targetStop.id);
            const resultStops: Pick<Stop, "name" | "id">[] = path!.map(s => { const st = this.graph.getStop(s); return { "name": st?.name || "No name found", "id": st!.id } } );
            if(result.dist === Infinity) {
                return {
                    status: false,
                    from: sourceStop.id,
                    to: targetStop.id,
                    msg: "No connection possible between providen stops"
                };
            } else {
                return {
                    status: true,
                    from: sourceStop.id,
                    to: targetStop.id,
                    path: {
                        distance: result.dist,
                        stops: resultStops
                    }
                };
            }
        }
        return {status: false, from: source, to: target, msg: "An error occurred, no such stops were found"};
    }
}

export { PathService };