// parsing-strategy.ts
import { Contact } from '../contacts/contact';

export interface ParsingStrategy<T extends Contact> {
    setContact(contact: T): void;
    parse(word: string): void;
}
