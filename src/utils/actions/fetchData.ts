export const fetchData = async <T>(
  baseUrl: string,
  searchParams?: Array<{ key: string; value: string | number }>
): Promise<T> => {
  try {
    const url = new URL(baseUrl);
    if (searchParams) {
      searchParams.forEach((item) =>
        url.searchParams.set(item.key, item.value.toString())
      );
    }
    const response = await fetch(url.toString());
    const data = (await response.json()) as T;
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
