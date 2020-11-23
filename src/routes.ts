import { Response, Request, Router } from 'express';
import { authMiddleware } from './middleware/auth.middleware';
import { PathService } from './stops/path.service';
import { StopsService } from './stops/stops.service';
import { statusCodes } from './utils/statusCodes';


class Routes {
    public router = Router();

    constructor() {
        this.initRoutes();
        this.initExceptionRoutes();
    }

    private initRoutes = () => {
        /**
         * GET /, /ping: Basic routes to confirm that Backend works correctly.
         *
         * @returns JSON containing 200 status code.
         */
        this.router.get(['/', '/ping'], (req: Request, res: Response) => {
            res.status(200).json( statusCodes[200].json );
        });

        /**
         * GET /stops: Returns list of stops in Solvro City.
         *
         * @returns JSON array of checklists' names.
         */
        this.router.get('/stops', async (req: Request, res: Response) => {
            try {
                const stopsService = new StopsService();
                const stops = await stopsService.findAllNames();
                res.status(200).json( stops );
            } catch (error) {
            res.status(404).json(statusCodes[404].json)
            }
        });

        /**
         * GET /path: Returns list of stops in path and total distance.
         *
         * @query source - Stop where the path begins
         * @query target - Stop where the path ends
         * @returns JSON containing stops and total distance
         */
        this.router.get('/path/:source/:target', async (req: Request, res: Response) => {
            const source: string = req.params.source;
            const target: string = req.params.target;
            try {
                const pathService = new PathService();
                const paths = await pathService.findPaths(source, target);
                if(paths.length) {
                    res.status(200).json(paths);
                }else{
                    res.status(400).json(statusCodes[400]);
                }
            } catch (error) {
            res.send(404).json(statusCodes[404].json)
            }
        });

        this.router.get('/secured', authMiddleware, async (req: Request, res: Response) => {
            try {
                res.status(200).json( statusCodes[200].json );
            } catch (error) {
            res.status(404).json(statusCodes[404].json)
            }
        });
    }

    private initExceptionRoutes = () => {

        /**
         * Catch all POST routes to defined GET routes
         *
         * @returns JSON containing 405 status code.
         */
        this.router.post('*', (req: Request, res: Response) => {
            res.status(405).json(statusCodes[405].json);
        });

        /**
         * Catch all PUT routes to defined GET routes
         *
         * @returns JSON containing 405 status code.
         */
        this.router.put('*', (req: Request, res: Response) => {
            res.status(405).json(statusCodes[405].json);
        });

        /**
         * Catch all HEAD routes to defined GET routes
         *
         * @returns JSON containing 405 status code.
         */
        this.router.head('*', (req: Request, res: Response) => {
            res.status(405).json(statusCodes[405].json);
        });

        /**
         * Catch all DELETE routes to defined GET routes
         *
         * @returns JSON containing 405 status code.
         */
        this.router.delete('*', (req: Request, res: Response) => {
            res.status(405).json(statusCodes[405].json);
        });

        /**
         * Catch all CONNECT routes to defined GET routes
         *
         * @returns JSON containing 405 status code.
         */
        this.router.connect('*', (req: Request, res: Response) => {
            res.status(405).json(statusCodes[405].json);
        });

        /**
         * Catch all PATCH routes to defined GET routes
         *
         * @returns JSON containing 405 status code.
         */
        this.router.patch('*', (req: Request, res: Response) => {
            res.status(405).json(statusCodes[405].json);
        });

        /**
         * Catch all TRACE routes to defined GET routes
         *
         * @returns JSON containing 405 status code.
         */
        this.router.trace('*', (req: Request, res: Response) => {
            res.status(405).json(statusCodes[405].json);
        });

        /**
         * Catch all non-registered GET routes
         *
         * @returns JSON containing 404 status code.
         */
        this.router.get('*', (req: Request, res: Response) => {
            res.status(404).json(statusCodes[404].json);
        });

        /**
         * Catch all non-registered POST routes
         *
         * @returns JSON containing 404 status code.
         */
        this.router.post('*', (req: Request, res: Response) => {
            res.status(404).json(statusCodes[404].json);
        });

        /**
         * Catch all non-registered PUT routes
         *
         * @returns JSON containing 404 status code.
         */
        this.router.put('*', (req: Request, res: Response) => {
            res.status(404).json(statusCodes[404].json);
        });


        /**
         * Catch all non-registered HEAD routes
         *
         * @returns JSON containing 404 status code.
         */
        this.router.head('*', (req: Request, res: Response) => {
            res.status(404).json(statusCodes[404].json);
        });


        /**
         * Catch all non-registered DELETE routes
         *
         * @returns JSON containing 404 status code.
         */
        this.router.delete('*', (req: Request, res: Response) => {
            res.status(404).json(statusCodes[404].json);
        });

        /**
         * Catch all non-registered CONNECT routes
         *
         * @returns JSON containing 404 status code.
         */
        this.router.connect('*', (req: Request, res: Response) => {
            res.status(404).json(statusCodes[404].json);
        });

        /**
         * Catch all non-registered TRACE routes
         *
         * @returns JSON containing 404 status code.
         */
        this.router.trace('*', (req: Request, res: Response) => {
            res.status(404).json(statusCodes[404].json);
        });

        /**
         * Catch all non-registered PATCH routes
         *
         * @returns JSON containing 404 status code.
         */
        this.router.patch('*', (req: Request, res: Response) => {
            res.status(404).json(statusCodes[404].json);
        });
    }
}

export { Routes };