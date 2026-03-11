import api from "./api";

/**
 * Custom Axios-based baseQuery for Redux Toolkit
 *
 * @param {*} param0 baseUrl for endpoint
 * @returns data from query or error
 */
export const axiosBaseQuery =
  // api, from api.js, already has the base url for the server
  // baseUrl here is for /api*
  ({ baseUrl }) =>
  async ({ url, method, data, params }) => {
    try {
      const result = await api({
        url: baseUrl + url,
        method,
        data,
        params
      });

      return { data: result.data }
    } catch (axiosError) {
      const err = axiosError
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message
        }
      }
    }
  }
