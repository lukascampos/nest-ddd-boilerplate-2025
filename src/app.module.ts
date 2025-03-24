import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './domain/user/user.module';
import { envSchema } from './shared/env/env';
import { AuthModule } from './domain/user/auth/auth.module';
import { PrismaService } from './shared/prisma/prisma.service';
import { AuthenticateModule } from './domain/user/authenticate/authenticate.module';

@Module({
  imports: [ConfigModule.forRoot({
    validate: (env) => envSchema.parse(env),
    isGlobal: true,
  }), UserModule, AuthModule, AuthenticateModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
