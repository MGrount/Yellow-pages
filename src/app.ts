import { Request, Response, NextFunction } from 'express';
import { json } from 'body-parser';
import { parseUserInput } from './controllers/contact-controller';
import express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.use(json());

// Define your routes
app.post('/api/parseUserInput', parseUserInput);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
