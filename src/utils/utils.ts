import express from 'express';

// Extending express Request with rawBody
export interface ExtendendRequest extends express.Request {
    [rawBody: string]: any;
}

export interface Link {
    distance: number;
    source: number;
    target: number;
};

export interface Node {
    id: number;
    stop_name: string;
}