import express from 'express';
import * as bodyParser from 'body-parser';
import { ExtendendRequest } from './utils/utils';
import { router } from './utils/router';

const app = express();
app.use(bodyParser.json({
    limit: '50mb',
    verify(req: ExtendendRequest, res: express.Response, buf: Buffer, encoding: BufferEncoding): void {
        if( buf && buf.length ) {
            req.rawBody = buf.toString(encoding || 'utf-8');
        }
    }
}));
app.use("/", router);

export { app }