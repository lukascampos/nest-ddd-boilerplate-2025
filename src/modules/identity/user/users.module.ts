import { Module } from '@nestjs/common';
import { PersistenceModule } from './persistence/persistence.module';
import { CreateUserController } from './http/controllers/create-user.controller';
import { CreateUserUseCase } from './core/useCases/create-user.useCase';
import { CryptographyModule } from '@/shared/cryptography/cryptography.module';

@Module({
  imports: [PersistenceModule, CryptographyModule],
  controllers: [CreateUserController],
  providers: [CreateUserUseCase],
})
export class UsersModule {}
