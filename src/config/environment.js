export const ENV = {
  production: process.env.NODE_ENV === 'production',
  apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:1234',
  apiTimeout: parseInt(process.env.REACT_APP_API_TIMEOUT, 10) || 10000,
};

export const APP_CONFIG = {
  name: 'AgriCult Dashboard',
  version: process.env.REACT_APP_VERSION || '1.0.0',
}; 