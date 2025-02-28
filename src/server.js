import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

export const setupServer = () => {
  const app = express();
  const PORT = Number(process.env.PORT);
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(cors());
  app.use(express.json());
  app.use('*', (req, res, next) => {
    res.status(404).json({ message: 'Not found' });
  });
  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  });
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
