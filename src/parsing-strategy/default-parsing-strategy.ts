// default-parsing-strategy.ts
import { Contact } from '../contacts/contact';
import { Rule } from '../rules/rule';
import { ParsingStrategy } from './parsing-strategy';

export class DefaultParsingStrategy<T extends Contact> implements ParsingStrategy<T> {
    private contact: T = {} as T;
    private rules: Rule<T>[];

    constructor(rules: Rule<T>[]) {
        this.rules = rules;
    }

    setContact(contact: T): void {
        this.contact = contact;
    }

    parse(word: string): void {
        this.rules.forEach((rule) => {
            rule.apply(word, this.contact);
        });
    }
}
