import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

interface JwtPayload {
  email: string;
}

class JwtUtils {
  static generateJwtToken(payload: JwtPayload) {
    return jwt.sign(payload, process.env.JWT_SECRET || 'secret', {
      expiresIn: process.env.JWT_EXPIRATION,
    });
  }

  static verifyJwtToken(token: string) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET || 'secret');
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
