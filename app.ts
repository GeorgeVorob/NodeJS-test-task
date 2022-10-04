import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const hostname = process.env.HOSTNAME;

app.get('/', (req: Request, res: Response) => {
    res.send('I am alive!');
});

app.listen(port, () => {
    console.log(`Server is listening at http://${hostname}:${port}`);
});