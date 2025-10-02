export interface Environment {
	BACKEND_URL: string;
	RENIEC_URL: string;
}

export const environment: Environment = {
	// BACKEND_URL: 'http://localhost:3002/v1/api',
	RENIEC_URL: 'https://api.apis.net.pe/v2/reniec/dni',

	BACKEND_URL: 'https://icase-backend.onrender.com/v1/api',
};
