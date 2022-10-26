export const getResponseData = (res) => {
  return res.ok ? res.json() : Promise.reject(res.status);
};
