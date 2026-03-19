import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: `${BACKEND_URL}/api`,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: false,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
    
    return config;
  },
  (error) => {
    console.error('[API Request Error]', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log(`[API Response] ${response.config.url} - Status: ${response.status}`);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    console.error('[API Error]', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      message: error.message,
      network: navigator.connection?.effectiveType || 'unknown'
    });

    if (error.message === 'Network Error' || !error.response) {
      console.warn('⚠️ Network error detected');
      
      if (!originalRequest._retry) {
        originalRequest._retry = true;
        originalRequest._retryCount = (originalRequest._retryCount || 0) + 1;

        if (originalRequest._retryCount <= 2) {
          console.log(`🔄 Retrying request (${originalRequest._retryCount}/2)...`);
          
          await new Promise(resolve => setTimeout(resolve, 1000 * originalRequest._retryCount));
          
          return api(originalRequest);
        }
      }

      return Promise.reject({
        message: 'Network connection issue. Please check your internet connection or try switching networks.',
        isNetworkError: true,
        originalError: error
      });
    }

    if (error.response?.status === 401) {
      console.warn('⚠️ 401 Unauthorized - Token may be invalid or network interference');
      
      const isAuthEndpoint = originalRequest.url?.includes('/login') ||
                            originalRequest.url?.includes('/signup') ||
                            originalRequest.url?.includes('/auth');
      
      if (!isAuthEndpoint && !originalRequest._retryAuth) {
        originalRequest._retryAuth = true;
        console.log('🔄 Retrying due to possible Jio network interference...');
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        return api(originalRequest);
      }

      localStorage.removeItem('authToken');
      
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login?session=expired';
      }
    }

    if (error.response?.status === 403) {
      console.error('❌ 403 Forbidden - Access denied');
    }

    if (error.response?.status >= 500) {
      console.error('❌ Server error - Backend may be down');
      return Promise.reject({
        message: 'Server error. Please try again later.',
        isServerError: true,
        originalError: error
      });
    }

    return Promise.reject(error);
  }
);

export const getNetworkInfo = () => {
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  
  if (connection) {
    return {
      effectiveType: connection.effectiveType, // '4g', '3g', '2g', 'slow-2g'
      downlink: connection.downlink, // Mbps
      rtt: connection.rtt, // Round trip time in ms
      saveData: connection.saveData, // Data saver mode
    };
  }
  
  return null;
};

export const isLikelyJioNetwork = () => {
  const networkInfo = getNetworkInfo();
  
  if (networkInfo) {
    const isSlowNetwork = networkInfo.effectiveType === '2g' || 
                         networkInfo.effectiveType === 'slow-2g' ||
                         networkInfo.rtt > 500; // High latency
    
    if (isSlowNetwork) {
      console.warn('⚠️ Slow network detected - may be Jio or poor connection');
      return true;
    }
  }
  
  return false;
};

export default api;

export { BACKEND_URL };

