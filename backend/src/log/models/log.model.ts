export interface LogModel {
	is_matched: boolean;
	mock_id?: number;
	request_info: {
		method: string;
		mock_url?: string;
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
