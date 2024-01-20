// birthday-rule.ts
// Rule implementation for extracting the birthday
import { Contact } from '../contacts/contact';
import { Rule } from './rule';

export class BirthdayRule<T extends Contact> implements Rule<T> {
    apply(word: string, contact: T): void {
        const yearMatch = word.match(/\b\d{1,3}\b/);
        if (!contact.birthday && yearMatch) {
            const age = parseInt(yearMatch[0], 10);
            if (age > 0 && age <= 130) {
                const currentYear = new Date().getFullYear();
                const calculatedYear = currentYear - age;
                contact.birthday = `${calculatedYear}`;
            } else {
                throw new Error("Invalid age. Age must be between 1 and 130.");
            }
        }
    }
}
