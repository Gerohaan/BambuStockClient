export const Global = {
  url: process.env.API_URL,
};
export const Headers = {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-type': 'Application/json',
    Authorization: `Bearer ${localStorage.token}`,
  },
};
