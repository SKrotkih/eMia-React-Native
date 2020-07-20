import AsyncStorage from '@react-native-community/async-storage';

export function getStorageItem(key) {
  return new Promise((resolve, reject) => {
    const _ = async () => {
      try {
        const value = await AsyncStorage.getItem(key);
        if (value === null) {
          reject('Failed parse storage item');
        } else {
          resolve(value);
        }
      } catch (e) {
        reject(e);
      }
    };
  });
}
export function getStorageObjectItem(key) {
  return new Promise((resolve, reject) => {
    const _ = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem(key);
        if (jsonValue === null) {
          reject('Failed parse of the storage item')
        } else {
          resolve(JSON.parse(jsonValue));
        }
      } catch (e) {
        reject(e)
      }
    };
  });
}

export function setStorageItem(key, value) {
  return new Promise((resolve, reject) => {
    const _ = async (value) => {
      try {
        await AsyncStorage.setItem(key, value);
        resolve();
      } catch (e) {
        reject(e);
      }
    };
  });
}

export function setStorageObjectItem(key, value) {
  return new Promise((resolve, reject) => {
      const _ = async (value) => {
        try {
          const jsonValue = JSON.stringify(value);
          await AsyncStorage.setItem(key, jsonValue);
          resolve();
        } catch (e) {
          reject(e);
        }
      };
    }
  )
}

export function removeStorageItem(key) {
  return new Promise((resolve, reject) => {
    const _ = async () => {
      try {
        await AsyncStorage.removeItem(key);
        resolve();
      } catch (e) {
        reject(e);
      }
    };
  });
}
