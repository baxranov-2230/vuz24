import {CryptoSecurity} from './cryptoSecurity';
export class LocalStorageSecurity {

  public static setItem(key: string, value: string): void {
    const encrypted_key = CryptoSecurity.encrypte(key);
    const encrypted_value = CryptoSecurity.encrypte(value);

    localStorage.setItem(encrypted_key, encrypted_value);
  }

  public static getItem(key: string): string {
    const encrypted_key = CryptoSecurity.encrypte(key);
    const encrypted_value = localStorage.getItem(encrypted_key);
    if (encrypted_value) {
      const value = CryptoSecurity.decrypte(encrypted_value);
      return value;
    }
    return null;
  }

  public static hasItem(key: string): boolean {
    const encrypted_key = CryptoSecurity.encrypte(key);
    const encrypted_value = localStorage.getItem(encrypted_key);
    if (encrypted_value === null) {
      return false;
    }
    return true;
  }
}