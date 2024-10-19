import { getBankAccount, InsufficientFundsError } from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const accountWithBalance = getBankAccount(500);
    expect(accountWithBalance.getBalance()).toBe(500);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const accountWithBalance = getBankAccount(500);
    expect(() => accountWithBalance.withdraw(1000)).toThrow(
      InsufficientFundsError,
    );
    expect(() => accountWithBalance.withdraw(1000)).toThrow(
      'Insufficient funds: cannot withdraw more than 500',
    );
  });

  test('should throw error when transferring more than balance', () => {
    // Write your test here
  });

  test('should throw error when transferring to the same account', () => {
    // Write your test here
  });

  test('should deposit money', () => {
    // Write your test here
  });

  test('should withdraw money', () => {
    // Write your test here
  });

  test('should transfer money', () => {
    // Write your test here
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    // Write your tests here
  });

  test('should set new balance if fetchBalance returned number', async () => {
    // Write your tests here
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    // Write your tests here
  });
});
