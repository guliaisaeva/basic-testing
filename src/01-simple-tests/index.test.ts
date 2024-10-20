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
    const product = simpleCalculator({
      a: 3,
      b: 5,
      action: Action.Multiply,
    });
    expect(product).toBe(15);
  });

  test('should divide two numbers', () => {
    const quotient = simpleCalculator({
      a: 20,
      b: 2,
      action: Action.Divide,
    });
    expect(quotient).toBe(10);
  });

  test('should exponentiate two numbers', () => {
    const power = simpleCalculator({
      a: 20,
      b: 2,
      action: Action.Exponentiate,
    });
    expect(power).toBe(400);
  });

  test('should return null for invalid action', () => {
    const invalidActions = ['invalid-action', '', 123, undefined, null];

    invalidActions.forEach((action) => {
      const result = simpleCalculator({ a: 2, b: 3, action });
      expect(result).toBeNull();
    });
  });

  test('should return null for invalid arguments', () => {
    const result1 = simpleCalculator({ a: 'ten', b: 3, action: Action.Add });
    const result2 = simpleCalculator({
      a: 2,
      b: null,
      action: Action.Multiply,
    });
    const result3 = simpleCalculator({
      a: undefined,
      b: 5,
      action: Action.Subtract,
    });

    expect(result1).toBeNull();
    expect(result2).toBeNull();
    expect(result3).toBeNull();
  });
});
