import axios from "axios";

const API_URL = "http://localhost:4000";

export const fetchHabits = () => axios.get(`${APIURL}/habits`);
