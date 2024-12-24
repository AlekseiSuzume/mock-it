export function convertHeadersToJson(headers: { key: string, value: string }[]): string {
  const jsonObject: { [key: string]: string } = {};
  headers.forEach(header => {
    if (header.key) {
      jsonObject[header.key] = header.value;
    }
  });
  return JSON.stringify(jsonObject);
}
