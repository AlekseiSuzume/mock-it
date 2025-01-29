import { MatcherType } from '@prisma/client';

export interface MockEntity {
	id?: number;
	name: string;
	url: string;
	status_code: number;
	headers?: string;
	method: string;
	body: string;
	body_patterns?: string;
	matcher_type?: MatcherType;
	created_by_id: number;
}
