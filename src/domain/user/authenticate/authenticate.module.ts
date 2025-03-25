import { Module } from '@nestjs/common';
import { PrismaService } from '@/shared/prisma/prisma.service';
import { AuthenticateController } from './authenticate.controller';
import { AuthenticateService } from './authenticate.service';

@Module({
  imports: [],
  controllers: [AuthenticateController],
  providers: [AuthenticateService, PrismaService],
})
export class AuthenticateModule {}
