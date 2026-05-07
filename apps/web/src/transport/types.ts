export interface TransportRequest {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  url: string;
  params?: unknown;
  body?: unknown;
}

export interface TransportResponse<T = unknown> {
  data: T;
  status: number;
}

export interface Transport {
  request<T>(req: TransportRequest): Promise<TransportResponse<T>>;
}
