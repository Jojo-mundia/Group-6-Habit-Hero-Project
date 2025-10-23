import axios from "axios";

const API_URL = "http://localhost:4000";

export const fetchHabits = () => axios.get(`${API_URL}/habits`);
export const addHabit = (habitData) =>
  axios.post(`${API_URL}/habits`, habitData);
export const updateHabit = (id, updatedData) =>
  axios.post(`${API_URL}/habits/${id}`, updatedData);
export const deleteHabit = (id) => axios.post(`${API_URL}/habits/${id}`);
