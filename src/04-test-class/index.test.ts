import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

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
    const account1 = getBankAccount(100);
    const account2 = getBankAccount(300);
    expect(() => account1.transfer(1000, account2)).toThrow(
      InsufficientFundsError,
    );
    expect(() => account1.transfer(1000, account2)).toThrow(
      'Insufficient funds: cannot withdraw more than 100',
    );
  });

  test('should throw error when transferring to the same account', () => {
    const accountWithBalance = getBankAccount(500);
    expect(() => accountWithBalance.transfer(50, accountWithBalance)).toThrow(
      TransferFailedError,
    );
    expect(() => accountWithBalance.transfer(50, accountWithBalance)).toThrow(
      'Transfer failed',
    );
  });

  test('should deposit money', () => {
    const accountWithBalance = getBankAccount(500);
    accountWithBalance.deposit(100);
    expect(accountWithBalance.getBalance()).toBe(600);
  });

  test('should withdraw money', () => {
    const accountWithBalance = getBankAccount(500);
    accountWithBalance.withdraw(400);
    expect(accountWithBalance.getBalance()).toBe(100);
  });

  test('should transfer money', () => {
    const account1 = getBankAccount(100);
    const account2 = getBankAccount(60);
    account1.transfer(50, account2);
    expect(account1.getBalance()).toBe(50);
    expect(account2.getBalance()).toBe(110);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const accountWithBalance = getBankAccount(100);
    jest.spyOn(accountWithBalance, 'fetchBalance').mockResolvedValue(75);

    const balance = await accountWithBalance.fetchBalance();
    expect(balance).toBeLessThanOrEqual(100);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const accountWithBalance = getBankAccount(100);
    jest.spyOn(accountWithBalance, 'fetchBalance').mockResolvedValue(50);
    await accountWithBalance.synchronizeBalance();
    expect(accountWithBalance.getBalance()).toBe(50);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const accountWithBalance = getBankAccount(100);
    jest.spyOn(accountWithBalance, 'fetchBalance').mockResolvedValue(null);
    await expect(accountWithBalance.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
    await expect(accountWithBalance.synchronizeBalance()).rejects.toThrow(
      'Synchronization failed',
    );
  });
});
