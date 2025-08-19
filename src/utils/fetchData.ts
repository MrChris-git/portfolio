export async function fetchJson<T>(
  uri: string,
  init?: RequestInit
): Promise<T> {
  const response = await fetch(uri, init);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${uri}: ${response.status} ${response.statusText}`
    );
  }
  return response.json() as Promise<T>;
}

export async function fetchText(
  uri: string,
  init?: RequestInit
): Promise<string> {
  const response = await fetch(uri, init);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${uri}: ${response.status} ${response.statusText}`
    );
  }
  return response.text();
}

export async function fetchData(
  key: string | string[],
  init?: RequestInit
): Promise<any> {
  const response = await fetch("/asset/json/data.json", init);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch data: ${response.status} ${response.statusText}`
    );
  }
  const json = await response.json();
  if (typeof key === "string") {
    return json[key];
  } else if (Array.isArray(key)) {
    const result: Record<string, any> = {};
    key.forEach((k) => {
      result[k] = json[k];
    });
    return result;
  }
}
