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
