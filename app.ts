import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { UseAuth } from './src/Controllers/Auth';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const hostname = process.env.HOSTNAME;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('I am alive!');
});

UseAuth(app);

app.listen(port, () => {
    console.log(`Server is listening at http://${hostname}:${port}`);
});