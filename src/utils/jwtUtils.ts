import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

interface JwtPayload {
  email: string;
}

class JwtUtils {
  static generateJwtToken(payload: JwtPayload) {
    const secret = process.env.JWT_SECRET || 'secret';
    const expiration = process.env.JWT_EXPIRATION || '1m';
    return jwt.sign(payload, secret, {
      expiresIn: expiration,
    });
  }

  static generateRefreshToken(payload: JwtPayload) {
    const secret = process.env.JWT_REFRESH_SECRET || 'refresh_secret';
    const expiration = process.env.JWT_REFRESH_EXPIRATION || '7d';
    return jwt.sign(payload, secret, {
      expiresIn: expiration,
    });
  }

  static verifyJwtToken(token: string) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET || 'secret') as JwtPayload;
    } catch (error) {
      return null;
    }
  }

  static verifyRefreshToken(token: string) {
    try {
      return jwt.verify(token, process.env.JWT_REFRESH_SECRET || 'refresh_secret') as JwtPayload;
    } catch (error) {
      return null;
    }
  }

  static hashPassword(password: string) {
    const saltRounds = 10;
    return bcrypt.hashSync(password, saltRounds);
  }

  static comparePassword(password: string, hash: string) {
    return bcrypt.compareSync(password, hash);
  }
}

export default JwtUtils;
