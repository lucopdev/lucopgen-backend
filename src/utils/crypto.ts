import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const algorithm = 'aes-256-cbc';
const secretKey = process.env.CRYPTO_SECRET_KEY as string;

if (!secretKey) {
  throw new Error('Secret key is not defined in environment variables');
}

const encryptPassword = (password: string) => {
  const algorithm = 'aes-256-cbc';
  const key = Buffer.from(secretKey, 'hex');
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encryptedPassword = cipher.update(password, 'utf8', 'hex');
  encryptedPassword += cipher.final('hex');

  return { iv: iv.toString('hex'), encryptedPassword };
};

const decryptPassword = (encryptedPassword: string, iv: string) => {
  const key = Buffer.from(secretKey, 'hex');
  const ivBuffer = Buffer.from(iv, 'hex');

  const decipher = crypto.createDecipheriv(algorithm, key, ivBuffer);
  let decryptedPassword = decipher.update(encryptedPassword, 'hex', 'utf8');
  decryptedPassword += decipher.final('utf8');

  return decryptedPassword;
};

const comparePassword = (providedPassword: string, encryptedPassword: string, iv: string) => {
  const decryptedPassword = decryptPassword(encryptedPassword, iv);
  return providedPassword === decryptedPassword;
};

export default { encryptPassword, decryptPassword, comparePassword };
