import express, {Request, Response} from 'express';
import { statusCodes } from './statusCodes';

export const router = express.Router();

/**
 * GET /, /ping: Basic routes to confirm that Backend works correctly.
 * 
 * @returns JSON containing 200 status code.
 */
router.get(['/', '/ping'], (req: Request, res: Response) => {
    res.status(200).json( statusCodes[200].json );
});

/**
 * GET /stops: Returns list of stops in Solvro City.
 * 
 * @returns JSON array of checklists' names.
 */
router.get('/stops', (req: Request, res: Response) => {
    try {
        res.status(200).json( statusCodes[200].json );
    } catch (error) {
      res.send(404).json(statusCodes[404].json)
    }
});

/**
 * GET /path: Returns list of stops in path and total distance.
 * 
 * @query source - Stop where the path begins
 * @query target - Stop where the path ends
 * @returns JSON containing stops and total distance
 */
router.get('/path/:source/:target', (req: Request, res: Response) => {
    try {
        res.status(200).json( statusCodes[200].json );
    } catch (error) {
      res.send(404).json(statusCodes[404].json)
    }
});

/**
 * Catch all non-registered routes
 * 
 * @returns JSON containing 404 status code.
*/
router.get('*', (req: Request, res: Response) => {
    res.status(404).json(statusCodes[404].json);
})