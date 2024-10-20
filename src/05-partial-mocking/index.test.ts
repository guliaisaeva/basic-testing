import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  return {
    mockOne: jest.fn(),
    mockTwo: jest.fn(),
    mockThree: jest.fn(),
    unmockedFunction: jest.requireActual('./index').unmockedFunction,
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    const consoleWatcher = jest.spyOn(console, 'log');
    mockOne();
    mockTwo();
    mockThree();
    expect(consoleWatcher).not.toHaveBeenCalled();
    consoleWatcher.mockRestore();
  });

  test('unmockedFunction should log into console', () => {
    const consoleWatcher = jest.spyOn(console, 'log');
    unmockedFunction();
    expect(consoleWatcher).toHaveBeenCalledWith('I am not mocked');
    consoleWatcher.mockRestore();
  });
});
