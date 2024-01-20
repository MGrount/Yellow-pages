// phone-number-rule.ts
// Rule implementation for extracting the phone number
import { Contact } from '../contacts/contact';
import { Rule } from './rule';

export class PhoneNumberRule<T extends Contact> implements Rule<T> {
    apply(word: string, contact: T): void {
        const phoneNumberMatch = word.match(/\b(05|03)\d{8}\b/);
        if (!contact.phone_number && phoneNumberMatch) {
            contact.phone_number = phoneNumberMatch[0];
        } else if (word.length === 10 && /^\d+$/.test(word)) {
            throw new Error("Invalid phone number format. Phone number must start with '05' or '03' and be 10 digits.");
        }
    }
}
