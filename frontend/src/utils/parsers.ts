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

export function parseJwt(token: string): any {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}
