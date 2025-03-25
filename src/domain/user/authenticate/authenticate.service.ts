import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { IService } from '@/common/interfaces/IService';
import { PrismaService } from '@/shared/prisma/prisma.service';

interface Input {
  email: string;
  password: string;
}

interface Output {
  accessToken?: string;
  error?: {
    error: string;
    message: string;
  }
}

@Injectable()
export class AuthenticateService implements IService<Input, Output> {
  constructor(
      private readonly jwt: JwtService,
      private readonly prisma: PrismaService,
  ) {}

  async execute({ email, password }: Input) {
    try {
      const userExists = await this.prisma.user.findFirst({
        where: {
          email,
        },
      });

      if (!userExists) {
        return {
          error: {
            error: 'Unauthorized',
            message: 'Invalid credentials',
          },
        };
      }

      const doesPasswordMatches = await compare(password, userExists.password);

      if (!doesPasswordMatches) {
        return {
          error: {
            error: 'Unauthorized',
            message: 'Invalid credentials',
          },
        };
      }

      const accessToken = this.jwt.sign({ sub: userExists.id });

      return { accessToken };
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
