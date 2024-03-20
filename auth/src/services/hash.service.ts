import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

export class HashService {
  static async toHash(data: string) {
    const salt = randomBytes(8).toString('hex');
    const buf = (await scryptAsync(data, salt, 64)) as Buffer;
    return `${buf.toString('hex')}.${salt}`;
  }

  static async compare(hash: string, data: string) {
    const [hashedData, salt] = hash.split('.');
    const buf = (await scryptAsync(data, salt, 64)) as Buffer;
    return buf.toString('hex') === hashedData;
  }
}
