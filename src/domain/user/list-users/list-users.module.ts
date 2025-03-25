import { Module } from '@nestjs/common';
import { PrismaService } from '@/shared/prisma/prisma.service';
import { ListUsersController } from './list-users.controller';
import { ListUsersService } from './list-users.service';

@Module({
  imports: [],
  controllers: [ListUsersController],
  providers: [PrismaService, ListUsersService],
})
export class ListUsersModule {}
