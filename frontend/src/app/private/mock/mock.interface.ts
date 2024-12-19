export interface IMock {
  id?: number,
  name: string;
  endpoint: string;
  method: string;
  status_code: number;
  body: string;
  bodyPatterns?: string;
  matcherType?: MatcherType;
  headers?: string;
  created_by_id?: number;
}

export enum MatcherType {
  KEY_TO_KEY,
  KEY_TO_VALUE
}
