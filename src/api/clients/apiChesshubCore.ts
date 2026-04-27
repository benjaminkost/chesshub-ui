import axios from 'axios';
import { 
    Configuration, 
    AuthApi, 
    ClubsApi, 
    TeamsApi, 
    GamesApi, 
    UsersApi 
} from '@benaurel/chesshub-core-client';

const BASE_URL = import.meta.env.VITE_CHESSHUB_CORE_BASEURL || 'https://chesshub.app:8080/api/chesshub-core/v1';

/**
 * Configure global axios instance for the API client
 */
const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true, // Required for cookie-based JWT authentication
});

/**
 * Common configuration for all API instances
 */
const apiConfig = new Configuration({
    basePath: BASE_URL,
});

// Singleton instances for easy access across the app
export const authApi = new AuthApi(apiConfig, BASE_URL, axiosInstance);
export const clubsApi = new ClubsApi(apiConfig, BASE_URL, axiosInstance);
export const teamsApi = new TeamsApi(apiConfig, BASE_URL, axiosInstance);
export const gamesApi = new GamesApi(apiConfig, BASE_URL, axiosInstance);
export const usersApi = new UsersApi(apiConfig, BASE_URL, axiosInstance);
