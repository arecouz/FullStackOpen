import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  async getAccessToken() {
    const token = await AsyncStorage.getItem(`${this.namespace}`);
    return token;
  }

  async setAccessToken(accessToken) {
    await AsyncStorage.setItem(`${this.namespace}`, accessToken);
  }

  async removeAccessToken() {
    await AsyncStorage.setItem(`${this.namespace}`);
  }
}

export default AuthStorage;
