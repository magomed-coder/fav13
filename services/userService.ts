import { STORAGE_KEYS } from "@/constants/storageKeys";
import AsyncStorage from "@react-native-async-storage/async-storage";

const saveUserName = async (userName: string) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.USER_NAME, userName);
  } catch (error) {
    console.error("[saveUserName error]", error);
    throw error;
  }
};

const getUserName = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(STORAGE_KEYS.USER_NAME);
  } catch (error) {
    console.error("[getUserName error]", error);
    return null;
  }
};

const removeUserName = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEYS.USER_NAME);
  } catch (error) {
    console.error("[removeUserName error]", error);
  }
};

export const userStorage = {
  saveUserName,
  getUserName,
  removeUserName,
};
