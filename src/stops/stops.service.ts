import * as city from '../utils/solvro_city.json';
import { Node } from '../utils/utils';

class StopsService {

    /**
     * Find All Stops
     * Returns JSON array of Stops with stop id and name.
     *
     * @returns Node Array
     */
    async findAll(): Promise<Node[]> {
        let stops: Node[] = [];
        if (city.nodes && city.nodes.length) {
            stops = city.nodes;
        }
        return stops;
    }
    /**
     * Find All Stop Names
     * Returns JSON array of stops names.
     *
     * @returns Promise - Unique Names object array
     */
    async findAllNames(): Promise<object[]> {
        const nodes = await this.findAll();
        const stopNames = nodes.map(stop => { return {"name": stop.stop_name} });
        return stopNames;
    }
    /**
     * Find Stop name by id
     *
     * @param id - number
     * @returns string if stop exists otherwise undefined.
     */
    async findStopNameById(id: number): Promise<string | undefined> {
        const nodes = await this.findAll();
        const stop = nodes.find(s => s.id === id);
        return stop ? stop.stop_name : undefined;
    }

    async findStopsByName(name: string): Promise<Node[]> {
        const nodes: Node[] = await this.findAll();
        const stops: Node[] = nodes.filter(s => s.stop_name === name);
        return stops;
    }
}

export { StopsService };