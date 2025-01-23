export interface MockModel {
  id?: number,
  name: string;
  url: string;
  method: string;
  status_code: number;
  body: string;
  body_patterns?: string;
  matcher_type?: string;
  headers?: string;
  created_by_id?: number;
}

export enum MatcherType {
  NONE = 'NONE',
  KEY_TO_KEY = 'KEY_TO_KEY',
  KEY_TO_VALUE = 'KEY_TO_VALUE'
}

export enum Methods {
  POST = 'POST',
  GET = 'GET',
  PATCH = 'PATCH',
  PUT = 'PUT',
  DELETE = 'DELETE',
  OPTIONS = 'OPTIONS'
}
