import Stop from "./stop";

export default interface Edge {
    from: Stop;
    to: Stop;
    distance: number;
}