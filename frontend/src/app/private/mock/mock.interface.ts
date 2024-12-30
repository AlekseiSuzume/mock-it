export interface IMock {
  id?: number,
  name: string;
  url: string;
  method: string;
  status_code: number;
  body: string;
  body_patterns?: string;
  matcherType?: MatcherType;
  headers?: string;
  created_by_id?: number;
}

export enum MatcherType {
  KEY_TO_KEY,
  KEY_TO_VALUE
}

export enum Methods {
  POST = 'POST',
  GET = 'GET',
  PATCH = 'PATCH',
  PUT = 'PUT',
  DELETE = 'DELETE',
  OPTIONS = 'OPTIONS'
}
