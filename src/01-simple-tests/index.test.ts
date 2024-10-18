// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const sum = simpleCalculator({ a: 2, b: 4, action: Action.Add });
    expect(sum).toBe(6);
  });

  test('should subtract two numbers', () => {
    const difference = simpleCalculator({
      a: 35,
      b: 30,
      action: Action.Subtract,
    });
    expect(difference).toBe(5);
  });

  test('should multiply two numbers', () => {
    // Write your test here
  });

  test('should divide two numbers', () => {
    // Write your test here
  });

  test('should exponentiate two numbers', () => {
    // Write your test here
  });

  test('should return null for invalid action', () => {
    // Write your test here
  });

  test('should return null for invalid arguments', () => {
    // Write your test here
  });
});
