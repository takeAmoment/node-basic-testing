// Uncomment the code below and write your tests
import {  simpleCalculator, Action } from './index';

const testCases = [
    { a: 1, b: 2, action: Action.Add, expected: 3 },
    { a: 2, b: 2, action: Action.Add, expected: 4 },
    { a: 3, b: 2, action: Action.Add, expected: 5 },
    { a: 3, b: 1, action: Action.Subtract, expected: 2},
    { a: 5, b: 2, action: Action.Subtract, expected: 3},
    { a: 3, b: 1, action: Action.Divide, expected: 3},
    { a: 4, b: 2, action: Action.Divide, expected: 2},
    { a: 1, b: 2, action: Action.Multiply, expected: 2},
    { a: 3, b: 2, action: Action.Multiply, expected: 6},
    { a: 2, b: 2, action: Action.Exponentiate, expected: 4},
    { a: 3, b: 2, action: Action.Exponentiate, expected: 9},
    { a: 1, b: 2, action: 'unknown', expected: null},
    { a: 6, b: 4, action: '.', expected: null},
    { a: '3', b: 1, action: Action.Add, expected: null},
    { a: 3, b: 'hello', action: Action.Subtract, expected: null},    
];

describe('simpleCalculator', () => {
  testCases.forEach(({ a, b, action, expected}) => {
    test(`should return ${expected} by operation ${action} on ${a} and ${b}`, () => {
      const result = simpleCalculator({ a, b, action})

      expect(result).toBe(expected)
    })
  })
});
