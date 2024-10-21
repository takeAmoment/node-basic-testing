import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock("axios");

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    jest.useFakeTimers(); 
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    const relativePath = '/posts/1';
    const mockResponseData = { id: 1, title: 'Test Post' };
    
    (axios.create as jest.Mock).mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: mockResponseData }),
    });

    await throttledGetDataFromApi(relativePath);

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });

  });

  test('should perform request to correct provided url', async () => {
    // 
  });

  test('should return response data', async () => {
    const relativePath = '/posts/1';
    const mockResponseData = { id: 1, title: 'Test Post' };

    const mockAxiosInstance = { 
      get: jest.fn().mockResolvedValue({ data: mockResponseData }) 
    };

    (axios.create as jest.Mock).mockReturnValue(mockAxiosInstance);

    const data = await throttledGetDataFromApi(relativePath);

    expect(data).toEqual(mockResponseData);
  });
});
