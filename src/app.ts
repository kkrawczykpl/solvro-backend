import express from 'express';
import * as bodyParser from 'body-parser';
import { ExtendendRequest } from './utils/utils';
import { Routes } from './utils/router';
import { AddressInfo } from 'net';
import mongoose from "mongoose";
import { AuthController } from './auth/auth.controller';
import cookieParser from 'cookie-parser';

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

        this.app.use(cookieParser());
    }

    private initRouter = () => {
        const authController = new AuthController();
        const routes = new Routes();
        this.app.use("/", authController.router);
        this.app.use("/", routes.router);
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