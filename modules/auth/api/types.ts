export interface LoginRequest {
	username: string;
	password: string;
}

export interface RegisterRequest {
	email: string;
	password: string;
}

export interface AuthResponse {
	access_token: string;
}