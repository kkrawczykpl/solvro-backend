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
        const uniqueNames = [...new Map(stopNames.map(stop => [stop.name, stop])).values()];
        return uniqueNames;
    }
}

export { StopsService };