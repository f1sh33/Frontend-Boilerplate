import { createMutationHook } from "@/lib/api";
import { AuthResponse, LoginRequest, RegisterRequest } from "./types";
import type { ApiModule } from "@/lib/api/types";


const api: ApiModule = {
    register: {
		endpoint: '/register',
		method: 'POST',
		queryKey: ['auth'],
		requestType: {} as RegisterRequest,
		responseType: {} as AuthResponse,
		successMessage: 'Đăng ký thành công',
		errorMessage: 'Đăng ký thất bại',
	},
    login: {
		endpoint: '/login',
		method: 'POST',
		queryKey: ['auth'],
		requestType: {} as LoginRequest,
		responseType: {} as AuthResponse,
		successMessage: 'Đăng nhập thành công',
		errorMessage: 'Đăng nhập thất bại',
	}
}

export const useRegister = createMutationHook(api.register);
export const useLogin = createMutationHook(api.login);