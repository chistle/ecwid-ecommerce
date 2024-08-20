import axios, { AxiosInstance } from 'axios';

const API_BASE_URL = 'https://app.ecwid.com/api/v3';
const STORE_ID = '58958138';
const PUBLIC_TOKEN = 'public_7BxbJGWyDaZfSQqjVS5Ftr4jzXkS43UD';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: `${API_BASE_URL}/${STORE_ID}`,
      params: {
        token: PUBLIC_TOKEN
      }
    });

    this.api.interceptors.response.use(
      response => response,
      error => {
        console.error('API Error:', error);
        return Promise.reject(error);
      }
    );
  }

  public get<T>(url: string, params: object = {}): Promise<T> {
    return this.api.get(url, { params }).then(response => response.data);
  }
}

export const apiService = new ApiService();