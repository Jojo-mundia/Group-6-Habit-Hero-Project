// API functions for handling habit data, shares, and upvotes with the backend
import axios from "axios";

// Base URL for the API, defaults to localhost if not set in environment
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

// Habit-related API functions
export const fetchHabits = () => axios.get(`${API_URL}/habits`);
export const addHabit = (habitData) =>
  axios.post(`${API_URL}/habits`, habitData);
export const updateHabit = (id, updatedData) =>
  axios.put(`${API_URL}/habits/${id}`, updatedData);
export const deleteHabit = (id) => axios.delete(`${API_URL}/habits/${id}`);

// Share-related API functions for public habit sharing
export const fetchShares = () => axios.get(`${API_URL}/shares`);
export const addShare = (shareData) =>
  axios.post(`${API_URL}/shares`, shareData);
export const updateShare = (id, updatedData) =>
  axios.put(`${API_URL}/shares/${id}`, updatedData);
export const deleteShare = (id) => axios.delete(`${API_URL}/shares/${id}`);

// Upvote-related API functions for liking shared habits
export const fetchUpvotes = () => axios.get(`${API_URL}/upvotes`);
export const addUpvote = (upvoteData) =>
  axios.post(`${API_URL}/upvotes`, upvoteData);
export const getUpvotesForShare = (shareId) =>
  axios.get(`${API_URL}/upvotes?shareId=${shareId}`);
