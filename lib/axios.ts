import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { tokenService } from "@/services/tokenService";
import axios from "axios";

const api = axios.create({
  baseURL: "https://fav-13.ru",
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔁 Перехватчик запросов
api.interceptors.request.use(
  async (config) => {
    const token = await tokenService.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🔁 Перехватчик ответов для рефреша токена
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await refreshToken();

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest); // повтор запроса
      } catch (refreshError) {
        console.error("[Token refresh failed]", refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;

// helpers
export const refreshToken = async () => {
  const refresh_token = await tokenService.getRefreshToken();
  const res = await api.post(API_ENDPOINTS.REFRESH_TOKEN, {
    refresh: refresh_token,
  });
  const { access: access_token, refresh: new_refresh_token } = res.data;
  await tokenService.saveTokens(access_token, new_refresh_token);

  return access_token;
};

// if (__DEV__) {
//   api.interceptors.request.use(
//     (config) => {
//       console.log("=== OUTGOING REQUEST ===");
//       console.log("baseURL:", config.baseURL);
//       console.log("url:", config.url);
//       console.log("Method:", config.method);
//       console.log("Headers:", config.headers);
//       console.log("Data:", config.data);
//       console.log("Params:", config.params);

//       return config;
//     },
//     (error) => {
//       console.error("REQUEST ERROR:", error);
//       return Promise.reject(error);
//     }
//   );
// }
