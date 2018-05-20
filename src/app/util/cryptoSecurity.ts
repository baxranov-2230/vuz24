import * as CryptoJS from 'crypto-js';

export class CryptoSecurity {

  private static key = CryptoJS.enc.Utf8.parse('7061737323313233');
  private static iv = CryptoJS.enc.Utf8.parse('7061737323313233');

  /* ENCRYPT_TO_STRING (MAKE_STRING_FROM_CRYPTO_KEY)*/
  public static decrypte(crypto: string): string {

    const decrypted = CryptoJS.AES.decrypt(crypto, this.key, {
      keySize: 128 / 8,
      iv: this.iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  }

  /* STRING_TO_ENCRYPT  (MAKE_CRYPTO_KEY_FROM_STRING) */
  public static encrypte(value: string): string {

    const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value), this.key,
      {
        keySize: 128 / 8,
        iv: this.iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });

    return encrypted.toString();
  }
}