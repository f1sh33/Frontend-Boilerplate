export interface ApiResponse<T> {
    data: T;
    message: string;
    status_code: number;
}

export interface PaginationInfo {
    total: number;
    page: number;
    limit: number;
}

export interface PaginationParams {
    page?: number;
    size?: number;
}

export interface PaginatedApiResponse<T> extends ApiResponse<T> {
    pages: PaginationInfo;
}

export interface FetcherParams<Req> {
    url: string;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    body?: Req;
    queryParams?: Record<string, any>;
    headers?: Record<string, string>;
    skipAuth?: boolean;
}

// Type definitions for API declarations
export interface ApiEndpoint<TRequest = any, TResponse = any> {
    endpoint: string;
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    queryKey: readonly unknown[];
    requestType: TRequest;
    responseType: TResponse;
    successMessage?: string;
    errorMessage?: string;
    resource?: string;
    queryOptions?: {
        retry?: boolean | number;
        refetchInterval?: number;
        enabled?: boolean;
        staleTime?: number;
        cacheTime?: number;
        refetchOnWindowFocus?: boolean;
        refetchOnMount?: boolean;
        refetchOnReconnect?: boolean;
    };
    mutationOptions?: {
        retry?: boolean | number;
        retryDelay?: number;
        onMutate?: (variables: TRequest) => void;
        onSettled?: (
            data: TResponse | undefined,
            error: Error | null,
            variables: TRequest,
        ) => void;
    };
}

export interface ApiModule {
    [key: string]: ApiEndpoint;
}
