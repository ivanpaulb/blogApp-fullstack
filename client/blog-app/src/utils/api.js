export const API = 'http://localhost:4000';

export const fetchWithToken = (url, options = {}, token) => {
  return fetch(`${API}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });
};
