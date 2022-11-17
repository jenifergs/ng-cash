import { App } from './App';
import 'dotenv/config';

const PORT = process.env.APP_PORT || 5433;

new App().start(PORT);
