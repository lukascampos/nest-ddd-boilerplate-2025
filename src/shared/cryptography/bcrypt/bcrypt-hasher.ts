import { hash } from 'bcryptjs';
import { HashGenerator } from '@/modules/identity/user/core/utils/cryptography/hash-generator';

export class BcryptHasher implements HashGenerator {
  private HASH_SALT_LENGTH = 10;

  hash(plain: string): Promise<string> {
    return hash(plain, this.HASH_SALT_LENGTH);
  }
}
