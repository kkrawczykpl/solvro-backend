import Stop from "../interfaces/stop";

class Graph {
    public stops: Stop[];

    constructor() {
        this.stops = [];
    }

    getStops(): Stop[] {
        return this.stops;
    }

    getStop(id: number): Stop | undefined {
        return this.stops.find(stop => stop.id === id);
    }

    addStop(stop: Pick<Stop, "id" | "name">): void {
        this.stops.push({
            id: stop.id,
            name: stop.name,
            edges: []
        });
    }

    addEdge(from: number, to: number, distance: number): boolean {
        const stop1 = this.getStop(from);
        const stop2 = this.getStop(to);
        if(stop1 && stop2) {
            stop1.edges.push({
                from: stop1.id,
                to: stop2.id,
                distance
            });

            const edge = {
                from: stop2.id,
                to: stop1.id,
                distance
            };

            if(stop2.edges.indexOf(edge) < 0) {
                stop2.edges.push(edge);
            }
            return true;
        }else{
            return false;
        }
    }
}

export { Graph };