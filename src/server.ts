import { validateEnv } from './utils/validateEnv';
import { App } from './app';
import 'dotenv/config';

validateEnv();

const app = new App();

app.listen();
