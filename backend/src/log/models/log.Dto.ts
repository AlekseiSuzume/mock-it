export interface LogDto {
	id?: number;
	mock_id?: number;
	is_matched: boolean;
	request_info: {
		method: string;
		request_url: string;
		request_body: string;
		request_headers: string;
		request_time: string;
	};
	response_info: {
		response_status: number;
		response_body: string;
		response_headers: string;
	};
}
