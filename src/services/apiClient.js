import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.your-company.com', // API的基礎URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// 攔截請求
apiClient.interceptors.request.use(
  (config) => {
    // 可以在這裡加入認證Token等
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 攔截回應
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // 可以統一處理API錯誤，例如重新導向到登入頁面
    if (error.response && error.response.status === 401) {
      // 未授權處理
    }
    return Promise.reject(error);
  }
);

export default apiClient;
