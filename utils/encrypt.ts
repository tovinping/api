import crypto from 'crypto'
import jsonwebtoken from 'jsonwebtoken'
export default class {
  static secretKey = 'TEST_SECRET_KEY'
  static md5Encrypt(data: string) {
    const hash = crypto.createHash('md5').update(data).digest('hex');
    return hash;
  }
  static jwtEncode(data: any) {
    return jsonwebtoken.sign({
        id: data.id,
        name: data.name
    }, this.secretKey);
  }
  static jwtVerify(token = '') {
      const decoded = jsonwebtoken.verify(token, this.secretKey)
      return decoded as any
  }
}