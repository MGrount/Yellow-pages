// rule.ts
// Interface representing a rule for parsing user input
export interface Rule<T> {
    apply(word: string, contact: T): void;
}
