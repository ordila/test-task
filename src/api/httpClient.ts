import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

if (!baseURL) {
  throw new Error(
    "Missing VITE_API_BASE_URL. Please configure the API base URL in your environment."
  );
}

export const httpClient = axios.create({
  baseURL,
  headers: {
    Accept: "application/json",
  },
});
