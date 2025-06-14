import { API_ENDPOINTS } from "@/constants/api-endpoints";
import AsyncStorage from "@react-native-async-storage/async-storage";

import api from "@/lib/axios";
import { tokenService } from "@/services/tokenService";

const login = async (username: string, password: string) => {
  try {
    const response = await api.post(API_ENDPOINTS.LOGIN, {
      username,
      password,
    });

    const { access: access_token, refresh: refresh_token } = response.data;

    await tokenService.saveTokens(access_token, refresh_token);

    return true;
  } catch (error: any) {
    console.error("[Login error]", error);
    throw error || { message: "Login failed" };
  }
};

const logout = async () => {
  try {
    await tokenService.clearTokens();
    await AsyncStorage.clear();
    return true;
  } catch (error) {
    console.warn("[Logout cleanup failed]", error);
  }
};

const getUser = async () => {
  try {
    const res = await api.get(API_ENDPOINTS.USER_INFO);
    return res.data;
  } catch (error: any) {
    throw error.response?.data || { message: "[Failed to fetch user]" };
  }
};

const refreshToken = async () => {
  const refresh_token = await tokenService.getRefreshToken();
  if (!refresh_token) throw new Error("[No refresh token found]");

  try {
    const response = await api.post(API_ENDPOINTS.REFRESH_TOKEN, {
      refresh: refresh_token,
    });

    const { access: access_token, refresh: new_refresh_token } = response.data;
    await tokenService.saveTokens(access_token, new_refresh_token);

    return access_token;
  } catch (error: any) {
    console.error("[Token refresh failed]", error);
    await tokenService.clearTokens();
    throw error;
  }
};

async function changePassword(old_password: string, new_password: string) {
  // Optionally: input validation here
  const body = { old_password, new_password };
  try {
    await api.post(API_ENDPOINTS.CHANGE_PASSWORD, body);
    return true;
  } catch (err: any) {
    // You could inspect err.response.status === 401 and try tokenService.refreshToken() here
    throw err.response?.data || new Error("Change password failed");
  }
}

const isAuthenticated = async () => {
  const token = await tokenService.getAccessToken();
  return !!token;
};

export const authService = {
  login,
  refreshToken,
  logout,
  getUser,
  isAuthenticated,
  changePassword,
};
