import express from 'express';
import * as bodyParser from 'body-parser';
import { ExtendendRequest, statusCodes } from './utils/utils';


const app = express();
app.use(bodyParser.json({
    limit: 50,
    verify(req: ExtendendRequest, res: express.Response, buf: Buffer, encoding: BufferEncoding): void {
        if( buf && buf.length ) {
            req.rawBody = buf.toString(encoding || 'utf-8');
        }
    }
}));

app.get('/ping', (req, res) => res.status(200).json( statusCodes[200].json ) );


export { app }