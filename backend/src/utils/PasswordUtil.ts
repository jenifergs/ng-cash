/* eslint-disable class-methods-use-this */
import { hashSync, compareSync } from 'bcryptjs';

class PasswordUtil {
  hashPassword(password: string): string {
    return hashSync(password, 10);
  }

  comparePassword(password: string, hash: string): boolean {
    return compareSync(password, hash);
  }
}

export default PasswordUtil;
