import express, { Application, Request, Response } from 'express';
import { Routes } from './routes';
import bodyParser from 'body-parser';

const app: Application = express();
const port: number = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Bind API root path to main router.
app.use('/', Routes);

// Start listening to 3000
app.listen(port, () => {
  console.log(`Express server listening on port:${port}`);
});

// Not found error.
app.use((req: Request, res: Response) => {
  res.status(404).json({ 'Message': 'Not Found.' });
});