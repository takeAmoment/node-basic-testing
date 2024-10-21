import { resolveValue, throwError, throwCustomError, MyAwesomeError, rejectCustomError } from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const result = await resolveValue(3)

    expect(result).toBe(3)
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const msg = 'error'

    expect(() => throwError(msg)).toThrowError(msg)
  });

  test('should throw error with default message if message is not provided', () => {
    const defaultMsg = 'Oops!'

    expect(() => throwError()).toThrowError(defaultMsg)
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrowError(MyAwesomeError)
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toThrowError(MyAwesomeError)
  });
});
