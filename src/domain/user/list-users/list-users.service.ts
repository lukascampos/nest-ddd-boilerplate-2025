import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { IService } from 'src/common/interfaces/IService';
import { PrismaService } from 'src/shared/prisma/prisma.service';

interface Input {
  page: number;
  limit: number;
}

interface Output {
  users?: User[];
  error?: {
    error: string;
    message: string;
  }
}

@Injectable()
export class ListUsersService implements IService<Input, Output> {
  constructor(private readonly prisma: PrismaService) {}

  async execute({ page, limit }: Input) {
    try {
      const offset = (page - 1) * limit;

      const users = await this.prisma.user.findMany({
        take: limit,
        skip: offset,
        orderBy: {
          createdAt: 'desc',
        },
      });

      return { users };
    } catch (error) {
      return {
        error: {
          error: 'Server error',
          message: error.message,
        },
      };
    }
  }
}
