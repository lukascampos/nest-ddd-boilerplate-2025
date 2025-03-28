import {
  Controller, Get,
  InternalServerErrorException,
  Query,
  UseGuards,
} from '@nestjs/common';
import { z } from 'zod';
import { IController } from '@/common/interfaces/IController';
import { PrismaService } from '@/shared/prisma/prisma.service';
import { ZodValidationPipe } from '@/shared/http/pipes/zod-validation.pipe';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ListUsersService } from './list-users.service';

const paginationQueryParamsSchema = z.object({
  page: z.string().optional().default('1').transform(Number)
    .pipe(z.number().min(1)),
  limit: z.string().optional().default('10').transform(Number)
    .pipe(z.number().min(5)),
});

type PaginationQueryParamsSchema = z.infer<typeof paginationQueryParamsSchema>

const queryValidationPipe = new ZodValidationPipe(paginationQueryParamsSchema);

@Controller('/users')
@UseGuards(JwtAuthGuard)
export class ListUsersController implements IController<unknown, unknown> {
  constructor(
    private readonly prisma: PrismaService,
    private readonly listUsersService: ListUsersService,
  ) {}

  @Get()
  async handle(@Query(queryValidationPipe) pagination: PaginationQueryParamsSchema) {
    const { users, error } = await this.listUsersService.execute(pagination);

    if (error) {
      throw new InternalServerErrorException();
    }

    return { users };
  }
}
