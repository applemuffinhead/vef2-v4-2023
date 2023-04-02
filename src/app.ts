import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import { cors } from './lib/cors.js';
import { router } from './routes/api.js';


dotenv.config();

const app = express();

app.use(express.static(path.join(__dirname, '../client/build')));

app.use(express.json());

app.use(cors);
app.use(router);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'not found' });
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (
    err instanceof SyntaxError &&
    'status' in err &&
    err.status === 400 &&
    'body' in err
  ) {
    return res.status(400).json({ error: 'invalid json' });
  }

  console.error('error handling route', err);
  return res
    .status(500)
    .json({ error: err.message ?? 'internal server error' });
});
