import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import dotenv from 'dotenv';
import { getAllContacts, getContactById } from './services/contacts.js';

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
  app.get('/contacts', async (req, res) => {
    const contacts = await getAllContacts();
    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  });

  app.get('/contacts/:contactId', async (req, res, next) => {
    try {
      const contactId = req.params.contactId;
      const contact = await getContactById(contactId);
      if (!contact) {
        res.json({
          status: 404,
          message: 'Contact not found',
        });
        return;
      }

      res.json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data: contact,
      });
    } catch (err) {
      res.status(400).json({ message: `Contact id does not exist` });
      next(err);
    }
  });

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
