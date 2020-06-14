import AsyncStorage from '@react-native-community/async-storage';

export function getStorageItem(key) {
  const _ = async () => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return value;
      }
    } catch (e) {
      return null;
    }
  };
}
export function getStorageObjectItem(key) {
  const _ = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      return null;
    }
  };
}

export function setStorageItem(key, value) {
  const _ = async (value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      // saving error
    }
  };
}

export function setStorageObjectItem(key, value) {
  const _ = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      // saving error
    }
  };
}

export function removeStorageItem(key) {
  const _ = async () => {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (e) {
      return false;
    }
  };
}
