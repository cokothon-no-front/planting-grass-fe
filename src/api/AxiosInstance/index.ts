import axios from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import meta from '@/api/meta';

const getAccessToken = () => localStorage.getItem('jwt');

const axiosInstance = axios.create(meta);
axiosInstance.interceptors.request.use((request: any) => {
  try {
    const token: string | null = getAccessToken()
    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }
  } catch (e) {}
  return request;
});

const refreshAuthLogic = (failedRequest: any) => {
  localStorage.removeItem('jwt')
  return Promise.resolve()
}

createAuthRefreshInterceptor(axiosInstance, refreshAuthLogic, {
  statusCodes: [ 401, 500 ],
  retryInstance: axiosInstance
});

export default axiosInstance