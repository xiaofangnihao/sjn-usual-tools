import CryptoJS from 'crypto-js'

/**
 * AES 加密
 * @param word: 需要加密的文本
 * KEY: // 需要前后端保持一致
 * mode: ECB // 需要前后端保持一致
 * pad: Pkcs7 //前端 Pkcs7 对应 后端 Pkcs5
 */
const key = CryptoJS.enc.Utf8.parse('1234123412ABCDEF');
const iv = CryptoJS.enc.Utf8.parse('ABCDEF1234123412');

// 加密
function Encrypt(word) {
  let srcs = CryptoJS.enc.Utf8.parse(word);
  let encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })
  return encrypted.ciphertext.toString().toUpperCase();
}

//解密
function Decrypt(word) {
  let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
  let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  let decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
}

export {
  Encrypt,
  Decrypt
}