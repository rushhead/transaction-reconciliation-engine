import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';
import apiRoutes from './routes/api';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(process.cwd(), 'src/public')));

app.use('/api', apiRoutes);

app.get('*', (_req: Request, res: Response) => {
  res.sendFile(path.join(process.cwd(), 'src/public', 'index.html'));
});

// Error handling middleware
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'An internal server error occurred.',
    error: err.message
  });
});

export default app;
