import { FetcherParams, type ApiEndpoint, type ApiModule, type PaginationParams } from "./types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export async function universalFetcher<Req, Res>({
	url,
	method = "GET",
	body,
	queryParams,
	headers = {},
	skipAuth = false,
}: FetcherParams<Req>): Promise<Res> {
	let fullUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`;

	if (queryParams) {
		const queryString = new URLSearchParams(queryParams).toString();
		fullUrl += `?${queryString}`;
	}

	const token = !skipAuth && typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

	const options: RequestInit = {
		method,
		headers: {
			"Content-Type": "application/json",
			...(token ? { Authorization: `Bearer ${token}` } : {}),
			...headers,
		},
	};

	if (body && method !== "GET") {
		options.body = JSON.stringify(body);
	}

	const response = await fetch(fullUrl, options);
	
	// Handle 204 No Content responses
	if (response.status === 204) {
		return undefined as Res;
	}
	
	const json = await response.json();

	if (!response.ok) {
		const error: any = new Error(json.message || "Request failed");
		error.status = response.status;
		throw error;
	}

	return json;
}

export async function uploadFile<Res>({
	url,
	formData,
	skipAuth = false,
}: {
	url: string;
	formData: FormData;
	skipAuth?: boolean;
}): Promise<Res> {
	const fullUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${url}`;
	const token = !skipAuth && typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

	const response = await fetch(fullUrl, {
		method: "POST",
		body: formData,
		headers: {
			...(token ? { Authorization: `Bearer ${token}` } : {}),
		},
	});

	const json = await response.json();

	if (!response.ok) {
		const error: any = new Error(json.message || "Upload failed");
		error.status = response.status;
		throw error;
	}

	return json;
}

// Helper function to replace URL parameters
const replaceParams = (endpoint: string, data: any) => {
	return endpoint.replace(/:(\w+)/g, (match, param) => {
		// If data is a string, use it directly (for simple ID replacements)
		if (typeof data === 'string') {
			return data;
		}
		// If data is an object, look for the property
		return data[param] || match;
	});
};

// Universal query hook creator that supports both paginated and non-paginated queries
export const createQueryHook = <T extends ApiEndpoint>(
	apiDef: T
) => {
	return (params?: PaginationParams | any) => {
		// Check if params is a PaginationParams object
		const isPaginationParams = params && typeof params === 'object' && ('page' in params || 'size' in params);
		
		if (isPaginationParams) {
			// Handle paginated query
			const paginationParams = params as PaginationParams;
			const queryParams: Record<string, any> = {};
			
			if (paginationParams?.page) queryParams.page = paginationParams.page;
			if (paginationParams?.size) queryParams.size = paginationParams.size;
			
			return useQuery<T['responseType']>({
				queryKey: [...apiDef.queryKey, 'pagination', paginationParams],
				queryFn: () => universalFetcher<undefined, T['responseType']>({
					url: apiDef.endpoint,
					method: apiDef.method,
					queryParams: Object.keys(queryParams).length > 0 ? queryParams : undefined
				}),
				staleTime: 5 * 60 * 1000, // 5 minutes
				...apiDef.queryOptions,
			});
		} else {
			// Handle regular query (non-paginated)
			return useQuery<T['responseType']>({
				queryKey: [...apiDef.queryKey, params],
				queryFn: () => universalFetcher<undefined, T['responseType']>({
					url: params ? replaceParams(apiDef.endpoint, params) : apiDef.endpoint,
					method: apiDef.method,
				}),
				...apiDef.queryOptions,
			});
		}
	};
};

// Helper function to create mutation hooks
export const createMutationHook = <T extends ApiEndpoint>(
	apiDef: T
) => {
	return () => {
		const queryClient = useQueryClient();
		
		return useMutation<T['responseType'], Error, T['requestType'] extends undefined ? string : T['requestType']>({
			mutationFn: (data: any) => {
				console.log('Mutation function called with data:', data);
				
				// Extract query parameters from data if they exist
				const { queryParams, ...bodyData } = data;
				
				return universalFetcher<T['requestType'], T['responseType']>({
					url: replaceParams(apiDef.endpoint, data),
					method: apiDef.method,
					body: Object.keys(bodyData).length > 0 ? bodyData : undefined,
					queryParams: queryParams
				});
			},
			onSuccess: (data) => {
				console.log('Mutation onSuccess called with data:', data);
				queryClient.invalidateQueries({ queryKey: apiDef.queryKey });
				if (apiDef.successMessage) {
					console.log('Showing success toast:', apiDef.successMessage);
					toast.success(apiDef.successMessage);
				}
			},
			onError: (error: Error) => {
				console.log('Mutation onError called with error:', error);
				if (apiDef.errorMessage) {
					console.log('Showing error toast:', apiDef.errorMessage);
					toast.error(apiDef.errorMessage);
				}
			},
			...apiDef.mutationOptions,
		});
	};
};