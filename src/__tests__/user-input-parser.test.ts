// src/__tests__/user-input-parser.test.ts
import { UserInputParser } from '../user-input-parser/user-input-parser';
import { DefaultParsingStrategy } from '../parsing-strategy/default-parsing-strategy';
import { createRules } from '../rules/rule-factory';

describe('UserInputParser', () => {
  const rulesKey = 'all';
  const rules = createRules(rulesKey);
  const parsingStrategy = new DefaultParsingStrategy(rules);
  const userInputParser = new UserInputParser(parsingStrategy);

  it('should parse user input correctly', () => {
    const userInput = 'John 33';
    const result = userInputParser.parse(userInput);

    expect(result).toEqual({
        birthday: "1991",
        name: "John"
    });
  });

  // Points to improve given additional time
});
