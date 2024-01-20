import { Request, Response } from 'express';
import { Contact, ContactProcessorResult } from '../contacts/contact';
import { ContactProcessorService } from '../services/contact-processor-service';

export const parseUserInput = async (req: Request, res: Response): Promise<void> => {
  try {
    const userInput: string = req.body.userInput;
    const limit: number = req.body.limit;
    const offset: number = req.body.offset;

    if (!userInput) {
      res.status(400).json({ error: 'User input is required.' });
      return;
    }

    const contactProcessor = new ContactProcessorService();
    const result: ContactProcessorResult<Contact> = await contactProcessor.processUserInput(userInput, limit, offset);

    if(result.data?.length === 0){
      res.status(400).json({ error: 'No results, please review your search or try a different one.' });
      return;
    }

    res.json(result);
  } catch (error) {
    console.error('Error processing user input:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};
