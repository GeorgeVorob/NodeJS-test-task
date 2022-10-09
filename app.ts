import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { UseAuth } from './src/Controllers/Auth';
import { UseUsers } from './src/Controllers/Users';
import { UseTags } from './src/Controllers/Tags';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const hostname = process.env.HOSTNAME;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('I am alive!');
});

UseAuth(app);
UseUsers(app);
UseTags(app);

app.listen(port, () => {
    console.log(`Server is listening at http://${hostname}:${port}`);
});