import { useInfiniteQuery, useQuery } from "react-query";


export const fetchData = async <T>(
  baseUrl: string,
  pathName: string,
  searchParamsArray: Array<Record<string, string | number>>
): Promise<T> => {
  const url = urlGenerator(baseUrl, pathName, searchParamsArray);
  const res = await fetch(url);
  const data = (await res.json()) as T;
  return data;
};


const baseUrl = "https://jsonplaceholder.typicode.com";
const pathName = "/posts";
export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

const getPosts = ({searchValue, limit, start}:{searchValue: string, limit?: number, start?: number}) => {
  const posts = fetchData<Array<Post>>(baseUrl, pathName, [
    { search: `^${searchValue}*` },
    { _limit: limit ?? 100 },
    { _start: start ?? 0 },
  ]);
  return posts;
};
export default getPosts;

export const useNewPosts = ({
  searchValue,
  limit,
  start,
  active,
}: {
  searchValue: string;
  limit?: number;
  start?: number;
  active: boolean;
}) => {
  return useQuery<Post[]>(
    ["posts-query", searchValue,limit, start ],
    () => getPosts({ searchValue: searchValue, limit:limit,start:start }),
    {
      enabled: active,
    }
  );
};

export const useNewInfinitePosts = ({
  searchValue,
  limit,
  start,
  active,
}: {
  searchValue: string;
  limit?: number;
  start?: number;
  active: boolean;
}) => {
  const fixedLimit = limit ?? 100;
  const fixedStart = start ?? 0;

  return useInfiniteQuery<Array<Post>>(
    ["get products",searchValue],
    ({ pageParam = { start: fixedStart, limit: fixedLimit } }) =>
      getPosts({
        searchValue: searchValue,
        start: pageParam.start,
        limit: pageParam.limit,
      }),
    {
      getNextPageParam: (lastPage, allPages) => ({
        start: allPages.length * fixedLimit,
        limit: fixedLimit,
      }),
      getPreviousPageParam: (lastPage, allPages) => ({
        start: (allPages.length > 0 ? allPages.length - 1 : 0) * fixedLimit,
        limit: fixedLimit,
      }),
      enabled: active,
    }
  );
};



export const urlGenerator = (
  baseUrl: string,
  pathName: string,
  searchParamsArray: Array<Record<string, string | number>>
) => {
  const validSearchParams = searchParamsArray.filter((param) => {
    const [_, value] = Object.entries(param)[0];
    // We can put here any condition on the value
    return value;
  });
  const sortedSearchParams = validSearchParams.sort((a, b) => {
    const [aKey] = Object.entries(a)[0];
    const [bKey] = Object.entries(b)[0];
    if (aKey > bKey) {
      return 1;
    } else if (aKey < bKey) {
      return -1;
    } else return 0;
  })
  const searchParams = sortedSearchParams
    .map((param) => {
      const [key, value] = Object.entries(param)[0];
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    })
    .join("&");
  const url = `${baseUrl}${pathName}?${searchParams}`;
  return url;
};