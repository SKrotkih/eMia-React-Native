import Constants from 'expo-constants'

export function isSimulator() {
  return !Constants.isDevice;
}
