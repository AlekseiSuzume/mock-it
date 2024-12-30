export interface ILog {
	method: string;
	mockUrl?: string;
	response_status: number;
	request_body: string;
	response_body: string;
	request_headers: string;
	response_headers: string;
	request_time: string;
	response_time: string;
	is_matched: boolean;
}
