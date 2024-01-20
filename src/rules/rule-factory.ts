// rule-factory.ts
import { Rule } from './rule';
import { NameRule } from './name-rule';
import { BirthdayRule } from './birthday-rule';
import { PhoneNumberRule } from './phone-number-rule';
import { Contact } from '../contacts/contact';

export function createRules<T extends Contact>(key?: string): Rule<T>[] {
    if (key === 'all') {
        return [new NameRule(), new BirthdayRule(), new PhoneNumberRule()];
    }

    switch (key) {
        case 'name':
            return [new NameRule()];
        case 'birthday':
            return [new BirthdayRule()];
        case 'phone':
            return [new PhoneNumberRule()];
        default:
            throw new Error(`Unknown rule key: ${key}`);
    }
}
