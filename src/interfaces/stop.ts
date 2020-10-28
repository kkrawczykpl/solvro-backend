import Edge from "./edge";

// id needed because stops may have same names
export default interface Stop {
    id: number;
    name: string;
    edges: Edge[];
}