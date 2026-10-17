type FetchDataOptions<TBody> = Omit<RequestInit, "body"> & {
  body?: TBody;
};

type FetchSuccess<TData> = {
  ok: true;
  status: number;
  data: TData;
};

type FetchFailure<TError> = {
  ok: false;
  status: number;
  error: TError;
};

export type FetchDataResult<TData, TError> = FetchSuccess<TData> | FetchFailure<TError>;

export async function fetchData<TData, TError = unknown, TBody = undefined>(url: string, options: FetchDataOptions<TBody> = {}): Promise<FetchDataResult<TData, TError>> {
  const { body, headers, ...restOptions } = options;

  const response = await fetch(url, {
    credentials: "same-origin",

    ...restOptions,

    headers: {
      Accept: "application/json",

      ...(body !== undefined && {
        "Content-Type": "application/json",
      }),

      ...headers,
    },

    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const data = await response.json();

  if (!response.ok) {
    return {
      ok: false,
      status: response.status,
      error: data as TError,
    };
  }

  return {
    ok: true,
    status: response.status,
    data: data as TData,
  };
}
