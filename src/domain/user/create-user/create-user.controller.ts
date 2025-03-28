import {
  Controller, Post, UsePipes, Body,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { z } from 'zod';
import { IController } from '@/common/interfaces/IController';
import { ZodValidationPipe } from '@/shared/http/pipes/zod-validation.pipe';
import { CreateUserService } from './create-user.service';

const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>;

@Controller('/users')
@UsePipes(new ZodValidationPipe(createAccountBodySchema))
export class CreateUserController implements IController<CreateAccountBodySchema, unknown> {
  constructor(
    private readonly createUserService: CreateUserService,
  ) {}

  @Post()
  async handle(@Body() body: CreateAccountBodySchema) {
    const { message, error } = await this.createUserService.execute(body);

    if (error) {
      switch (error.error) {
        case 'Conflict':
          throw new ConflictException(error.message);
        default:
          throw new InternalServerErrorException();
      }
    }

    return { message };
  }
}
