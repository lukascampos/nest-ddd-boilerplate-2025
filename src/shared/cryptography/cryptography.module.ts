import { Module } from '@nestjs/common';
import { HashGenerator } from '@/modules/identity/user/core/utils/cryptography/hash-generator';
import { BcryptHasher } from './bcrypt/bcrypt-hasher';

@Module({
  providers: [
    { provide: HashGenerator, useClass: BcryptHasher },
  ],
  exports: [HashGenerator],
})
export class CryptographyModule {}
