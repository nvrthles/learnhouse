import { getUriWithOrg } from "@services/config/config";

export const RequestBody = (method: string, data: any, next: any) => {
  let HeadersConfig = new Headers({ "Content-Type": "application/json" });
  let options: any = {
    method: method,
    headers: HeadersConfig,
    redirect: "follow",
    credentials: "include",
    // Next.js
    next: next,
  };
  if (data) {
    options.body = JSON.stringify(data);
  }
  return options;
};

export const RequestBodyWithAuthHeader = (method: string, data: any, next: any, token: string) => {
  let HeadersConfig = new Headers(token ? { "Content-Type": "application/json", Authorization: `Bearer ${token}` } : { "Content-Type": "application/json" });
  let options: any = {
    method: method,
    headers: HeadersConfig,
    redirect: "follow",
    credentials: "include",
    body: data,
    // Next.js
    next: next,
  };
  return options;
};

export const RequestBodyForm = (method: string, data: any, next: any) => {
  let HeadersConfig = new Headers({});
  let options: any = {
    method: method,
    headers: HeadersConfig,
    redirect: "follow",
    credentials: "include",
    body: data,
    // Next.js
    next: next,
  };
  return options;
};

export const swrFetcher = async (url: string) => {
  // Create the request options
  let HeadersConfig = new Headers({ "Content-Type": "application/json" });
  let options: any = {
    method: "GET",
    headers: HeadersConfig,
    redirect: "follow",
    credentials: "include",
  };

  try {
    // Fetch the data
    const request = await fetch(url, options);
    let res = errorHandling(request);

    // Return the data
    return res;
  } catch (error: any) {
    throw error;
  }
};

export const errorHandling = (res: any) => {
  if (!res.ok) {
    const error: any = new Error(`${res.statusText}`);
    error.status = res.status;
    throw error;
  }
  return res.json();
};

export const revalidateTags = async (tags: string[], orgslug: string) => {
  const url = getUriWithOrg(orgslug, "");
  tags.forEach((tag) => {
    fetch(`${url}/api/revalidate?tag=${tag}`);
  });
};
