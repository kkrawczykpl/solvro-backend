import Stop from "./stop";

interface Path {
    status: boolean;
    msg: string;
    path?: {
        distance: number;
        stops: Stop[];
    }
}

export { Path };