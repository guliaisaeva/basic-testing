import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('throttledGetDataFromApi', () => {
  const relativePath = '/posts/1';
  const mockResponseData = { id: 1, title: 'Sample Post' };
  let axiosInstance: jest.Mocked<typeof axios>;

  beforeEach(() => {
    jest.useFakeTimers();

    axiosInstance = {
      get: jest.fn().mockResolvedValue({ data: mockResponseData }),
      create: jest.fn(() => axiosInstance),
    } as unknown as jest.Mocked<typeof axios>;

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

  test('should perform request to correct provided url', async () => {});

  test('should return response data', async () => {
    const responseData = await throttledGetDataFromApi(relativePath);
    expect(responseData).toEqual(mockResponseData);
  });
});
