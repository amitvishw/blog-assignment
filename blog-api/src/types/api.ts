export interface APIResponse {
  readonly status: number;
  readonly message?: string;
  readonly data?: object;
}
