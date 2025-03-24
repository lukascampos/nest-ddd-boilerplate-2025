import { Injectable } from '@nestjs/common';
import { hash } from 'bcryptjs';
import { IService } from 'src/common/interfaces/IService';
import { PrismaService } from 'src/shared/prisma/prisma.service';

interface Input {
  name: string;
  email: string;
  password: string;
}

interface Output {
  message?: string;
  error?: {
    error: string;
    message: string;
  }
}

@Injectable()
export class CreateUserService implements IService<Input, Output> {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async execute({ name, email, password }: Input) {
    try {
      const userWithSameEmail = await this.prisma.user.findFirst({
        where: {
          email,
        },
      });

      if (userWithSameEmail) {
        return {
          error: {
            error: 'Conflict',
            message: 'User with same e-mail alredy exists.',
          },
        };
      }

      const hashedPassword = await hash(password, 10);

      await this.prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      return {
        message: `User ${name} successfully created`,
      };
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
