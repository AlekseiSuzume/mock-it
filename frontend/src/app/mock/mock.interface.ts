export interface IMock {
  id?: number,
  name: string,
  endpoint: string,
  method: string,
  bodyPatterns:string,
  headers: string,
  status_code: number,
  body: string
}
