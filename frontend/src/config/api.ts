// Configuración global de la aplicación
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
const APP_PORT = process.env.PORT || '3000';

export const config = {
  // URL base de la API
  apiUrl: API_BASE_URL,
  
  // Puerto de la aplicación
  port: APP_PORT,
  
  // Endpoints específicos
  endpoints: {
    jurados: '/jurados',
    register: '/register',
  },
  
  // Función helper para construir URLs completas
  getApiUrl: (endpoint: string) => {
    return `${config.apiUrl}${endpoint}`;
  },
};

// Exportar endpoints específicos para facilitar el uso
export const API_ENDPOINTS = {
  jurados: config.getApiUrl(config.endpoints.jurados),
  register: config.getApiUrl(config.endpoints.register),
};
