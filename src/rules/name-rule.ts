// name-rule.ts
// Rule implementation for extracting the name
import { Contact } from '../contacts/contact';
import { Rule } from './rule';

export class NameRule<T extends Contact> implements Rule<T> {
    apply(word: string, contact: T): void {
        if (!contact.name && /^[a-zA-Z\s]+$/.test(word)) {
            contact.name = word;
        } else if (contact.name && /^[a-zA-Z\s]+$/.test(word)) {
            // Append the word to the existing name, preserving capitalization
            contact.name += ` ${word}`;
        }
    }
}
