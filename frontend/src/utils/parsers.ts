
export function parseHeaders(jsonString: string): { key: string, value: string }[] {
  if (jsonString.length > 0) {
    try {
      const jsonObject = JSON.parse(jsonString);
      const headersArray: { key: string, value: string }[] = [];

      for (const key in jsonObject) {
        if (jsonObject.hasOwnProperty(key)) {
          headersArray.push({ key, value: jsonObject[key] });
        }
      }

      return headersArray;

    } catch (error) {
      console.error('Ошибка при парсинге JSON:', error);
      return [];
    }
  } else {
    return [];
  }
}
