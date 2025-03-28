import { HashGenerator } from '@/modules/identity/user/core/utils/cryptography/hash-generator';

export class FakeHasher implements HashGenerator {
  async hash(plain: string): Promise<string> {
    return plain.concat('-hashed');
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    return plain.concat('-hashed') === hash;
  }
}
