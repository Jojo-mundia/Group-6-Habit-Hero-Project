// Share-related API functions for public habit sharing
export const fetchShares = () => axios.get(`${API_URL}/shares`);
export const addShare = (shareData) =>
  axios.post(`${API_URL}/shares`, shareData);
export const updateShare = (id, updatedData) =>
  axios.put(`${API_URL}/shares/${id}`, updatedData);
export const deleteShare = (id) => axios.delete(`${API_URL}/shares/${id}`);
