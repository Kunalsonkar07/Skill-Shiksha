import axios from "axios"
// Create an axios instance with a base URL
export const axiosInstance = axios.create({})

// Reusable API connector function
export const apiConnector = (method, url, bodyData = null, headers = null, params = null) => {
  return axiosInstance({
    method,
    url,
    data: bodyData,
    headers,
    params,
  })
}

// {
//   Authoirization:`Bearer ${token}`,
// }