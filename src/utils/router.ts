import express, {Request, Response} from 'express';
import { StopsService } from '../stops/stops.service';
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
router.get('/stops', async (req: Request, res: Response) => {
    try {
        const stopsService = new StopsService();
        const stops = await stopsService.findAllNames();
        res.status(200).json( stops );
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
 * Catch all POST routes to defined GET routes
 *
 * @returns JSON containing 405 status code.
 */
router.post(['/', '/ping', '/stops', '/path/*'], (req: Request, res: Response) => {
    res.status(405).json(statusCodes[405].json);
});

/**
 * Catch all PUT routes to defined GET routes
 *
 * @returns JSON containing 405 status code.
 */
router.put(['/', '/ping', '/stops', '/path/*'], (req: Request, res: Response) => {
    res.status(405).json(statusCodes[405].json);
});

/**
 * Catch all HEAD routes to defined GET routes
 *
 * @returns JSON containing 405 status code.
 */
router.head(['/', '/ping', '/stops', '/path/*'], (req: Request, res: Response) => {
    res.status(405).json(statusCodes[405].json);
});

/**
 * Catch all DELETE routes to defined GET routes
 *
 * @returns JSON containing 405 status code.
 */
router.delete(['/', '/ping', '/stops', '/path/*'], (req: Request, res: Response) => {
    res.status(405).json(statusCodes[405].json);
});

/**
 * Catch all CONNECT routes to defined GET routes
 *
 * @returns JSON containing 405 status code.
 */
router.connect(['/', '/ping', '/stops', '/path/*'], (req: Request, res: Response) => {
    res.status(405).json(statusCodes[405].json);
});

/**
 * Catch all PATCH routes to defined GET routes
 *
 * @returns JSON containing 405 status code.
 */
router.patch(['/', '/ping', '/stops', '/path/*'], (req: Request, res: Response) => {
    res.status(405).json(statusCodes[405].json);
});

/**
 * Catch all TRACE routes to defined GET routes
 *
 * @returns JSON containing 405 status code.
 */
router.trace(['/', '/ping', '/stops', '/path/*'], (req: Request, res: Response) => {
    res.status(405).json(statusCodes[405].json);
});

/**
 * Catch all non-registered GET routes
 *
 * @returns JSON containing 404 status code.
 */
router.get('*', (req: Request, res: Response) => {
    res.status(404).json(statusCodes[404].json);
});

/**
 * Catch all non-registered POST routes
 *
 * @returns JSON containing 404 status code.
 */
router.post('*', (req: Request, res: Response) => {
    res.status(404).json(statusCodes[404].json);
});

/**
 * Catch all non-registered PUT routes
 *
 * @returns JSON containing 404 status code.
 */
router.put('*', (req: Request, res: Response) => {
    res.status(404).json(statusCodes[404].json);
});


/**
 * Catch all non-registered HEAD routes
 *
 * @returns JSON containing 404 status code.
 */
router.head('*', (req: Request, res: Response) => {
    res.status(404).json(statusCodes[404].json);
});


/**
 * Catch all non-registered DELETE routes
 *
 * @returns JSON containing 404 status code.
 */
router.delete('*', (req: Request, res: Response) => {
    res.status(404).json(statusCodes[404].json);
});

/**
 * Catch all non-registered CONNECT routes
 *
 * @returns JSON containing 404 status code.
 */
router.connect('*', (req: Request, res: Response) => {
    res.status(404).json(statusCodes[404].json);
});

/**
 * Catch all non-registered TRACE routes
 *
 * @returns JSON containing 404 status code.
 */
router.trace('*', (req: Request, res: Response) => {
    res.status(404).json(statusCodes[404].json);
});

/**
 * Catch all non-registered PATCH routes
 *
 * @returns JSON containing 404 status code.
 */
router.patch('*', (req: Request, res: Response) => {
    res.status(404).json(statusCodes[404].json);
});