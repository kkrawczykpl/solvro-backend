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
     * Find Stop By Id
     * Checks if Node exists by given ID
     * Returns
     * @throws Error if couple nodes has same ID
     * @returns Promise - Node element or undefined
     */
    async findStopById(id: number): Promise<Node | undefined> {
        const nodes: Node[] = await this.findAll();
        const stop: Node[] = nodes.filter(s => s.id === id);
        if(stop.length === 1) {
            return stop[0];
        }else if(stop.length > 1) {
            throw new Error("Invalid City file! The stops have an unavoidable ID. ID: " + id);
        }else {
            return undefined;
        }
    }
}

export { StopsService };