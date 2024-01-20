// user-input-parser.ts
import { Contact } from '../contacts/contact';
import { ParsingStrategy } from '../parsing-strategy/parsing-strategy';

export class UserInputParser<T extends Contact> {
    private contact: T = {} as T;
    private strategy: ParsingStrategy<T>;

    constructor(strategy: ParsingStrategy<T>) {
        this.strategy = strategy;
    }

    parse(input: string): T {
        const words = input.split(' ');

        this.strategy.setContact(this.contact);
        words.forEach((word) => {
            this.strategy.parse(word);
        });

        if (Object.keys(this.contact).length === 0) {
            throw new Error("Invalid input. Please provide a valid name, birthday, or phone number.");
        }

        return this.contact;
    }
}
