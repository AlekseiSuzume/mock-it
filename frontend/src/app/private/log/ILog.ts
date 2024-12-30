export interface ILog {
  id: number,
  method: string;
  mock_url?: string;
  response_status: number;
  request_body: string;
  response_body: string;
  request_headers: string;
  response_headers: string;
  request_time: string;
  is_matched: boolean;
}
