import axios, {AxiosRequestConfig} from 'axios';
import { baseUrl } from 'shared';

const axiosConfig: AxiosRequestConfig={baseURL: baseUrl};
export const axiosInstance=axios.create(axiosConfig);