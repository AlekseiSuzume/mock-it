interface IMock {
	id: number;
	name: string;
	url: string;
	method: string;
	body_patterns?: string;
	headers?: string;
	status_code: number;
	body: string;
}
