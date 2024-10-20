import { doStuffByTimeout, doStuffByInterval, readFileAsynchronously } from '.';
import fs from 'fs/promises';
import path from 'path';
 
const TIMEOUT = 1000;
const TEST_FILE_CONTENT = 'Hello, Developer!';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    
    doStuffByTimeout(callback, TIMEOUT);
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(TIMEOUT);

    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(1);

  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn()
    
    doStuffByTimeout(callback, TIMEOUT)
    expect(callback).not.toHaveBeenCalled()

    jest.advanceTimersByTime(TIMEOUT - 200)

    expect(callback).not.toHaveBeenCalled()

    jest.advanceTimersByTime(TIMEOUT)

    expect(callback).toHaveBeenCalled()
    expect(callback).toHaveBeenCalledTimes(1)
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    
    doStuffByInterval(callback, TIMEOUT);
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(TIMEOUT);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    
    doStuffByInterval(callback, TIMEOUT)
    expect(callback).not.toHaveBeenCalled()

    jest.advanceTimersByTime(TIMEOUT * 3)

    expect(callback).toHaveBeenCalledTimes(3)
  });
});

describe('readFileAsynchronously', () => {
  const testFilePath = 'testFile.txt';
  
  beforeAll(async () => {
    await fs.writeFile(path.join(__dirname, testFilePath), TEST_FILE_CONTENT);
  });

  afterAll(async () => {
    await fs.unlink(path.join(__dirname, testFilePath));
  });

  test('should call join with pathToFile', async () => {
    console.log(__dirname);
    const filePath = path.join(__dirname, testFilePath);
    const result = await fs.access(filePath, fs.constants.F_OK);
    expect(result).toBeUndefined();
  });

  test('should return null if file does not exist', async () => {
    const result = await readFileAsynchronously('unknown.txt');

    expect(result).toBe(null);
  });

  test('should return file content if file exists', async () => {
    const result = await readFileAsynchronously(testFilePath);

    expect(result).toBe(TEST_FILE_CONTENT);
  });
});
