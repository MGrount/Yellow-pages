// src/services/contact-processor-service.ts
import { Contact, ContactProcessorResult } from '../contacts/contact';
import { UserInputParser } from '../user-input-parser/user-input-parser';
import { DefaultParsingStrategy } from '../parsing-strategy/default-parsing-strategy';
import { Rule } from '../rules/rule';
import { createRules } from '../rules/rule-factory';
import { ContactRepository } from '../data-access/contact-repository';

export class ContactProcessorService<T extends Contact> {
  private userInputParser: UserInputParser<T>;
  private contactRepository: ContactRepository<T>;

  constructor() {
    const rulesKey = 'all';
    const rules: Rule<T>[] = createRules(rulesKey);

    const parsingStrategy = new DefaultParsingStrategy<T>(rules);
    this.userInputParser = new UserInputParser<T>(parsingStrategy);

    this.contactRepository = new ContactRepository<T>();
  }

  async processUserInput(userInput: string, limit?: number, offset?: number): Promise<ContactProcessorResult<T>> {
    try {
      const contact: T = this.userInputParser.parse(userInput);
      console.log(contact);
      const result: T[] = await this.contactRepository.getContacts(contact, limit, offset);

      return { success: true, data: result };
    } catch (error) {
      console.error('Error processing user input:', error);
      return { success: false, error: 'Failed to process user input.' };
    }
  }
}
