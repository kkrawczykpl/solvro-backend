import Stop from "../interfaces/stop";

interface Path {
    distance: number;
    stops: Pick<Stop, "name" | "id">[];
}


export default interface PathResponse {
    status: boolean;
    from: number;
    to: number;
    path?: Path;
    msg?: string;
}