import express from 'express';
import * as bodyParser from 'body-parser';
import { ExtendendRequest } from './utils/utils';
import { router } from './utils/router';
import { AddressInfo } from 'net';
import mongoose from "mongoose";

class App {
    public app: express.Application;

    constructor() {
        this.app = express();

        this.connectToTheDatabase();
        this.initMiddleware();
        this.initRouter();
    }

    public listen = () => {
        const server = this.app.listen(+(process.env.PORT || 1337), '0.0.0.0', () => {
            const { port, address } = server.address() as AddressInfo;
            console.log(`Server listening on: http://${address}:${+port}`);
        });
    }

    private initMiddleware = () => {
        this.app.use(bodyParser.json({
            limit: '50mb',
            verify(req: ExtendendRequest, res: express.Response, buf: Buffer, encoding: BufferEncoding): void {
                if( buf && buf.length ) {
                    req.rawBody = buf.toString(encoding || 'utf-8');
                }
            }
        }));
    }

    private initRouter = () => {
        this.app.use("/", router);
    }
    private connectToTheDatabase() {
        const {
            MONGO_USER,
            MONGO_PASSWORD,
            MONGO_PATH,
        } = process.env;
        mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`, { useNewUrlParser: true, useUnifiedTopology: true });
    }
}

export { App }