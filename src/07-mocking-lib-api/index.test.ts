import axios, { AxiosInstance } from 'axios';
import { throttledGetDataFromApi, THROTTLE_TIME } from './index';

jest.mock('axios');
jest.mock('lodash', () => ({
  throttle: (fn: () => unknown) => fn,
}));
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('throttledGetDataFromApi', () => {
  let axiosInstance: jest.Mocked<AxiosInstance>;
  const relativePath = '/blogs/1';
  const mockResponseData = { id: 1, title: 'About Jest Testing' };

  beforeEach(() => {
    jest.useFakeTimers();

    axiosInstance = {
      get: jest.fn().mockResolvedValue({ data: mockResponseData }),
      create: jest.fn(() => axiosInstance),
    } as unknown as jest.Mocked<AxiosInstance>;

    mockedAxios.create.mockReturnValue(axiosInstance);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi(relativePath);
    expect(mockedAxios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    axiosInstance.get.mockResolvedValue({ data: mockResponseData });

    const throttledCall = throttledGetDataFromApi(relativePath);
    jest.advanceTimersByTime(THROTTLE_TIME);
    await throttledCall;
    expect(axiosInstance.get).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const responseData = await throttledGetDataFromApi(relativePath);
    expect(responseData).toEqual(mockResponseData);
  });
});
