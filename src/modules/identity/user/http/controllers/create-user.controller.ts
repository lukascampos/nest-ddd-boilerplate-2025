import {
  Controller, Body, ConflictException, BadRequestException,
  Post,
} from '@nestjs/common';
import { CreateUserUseCase } from '../../core/useCases/create-user.useCase';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserAlreadyExistsError } from '../../core/errors/user-already-exists.error';

@Controller('/users')
export class CreateUserController {
  constructor(private readonly createUser: CreateUserUseCase) {}

  @Post()
  async handle(@Body() body: CreateUserDto) {
    const { name, email, password } = body;

    const result = await this.createUser.execute({
      name,
      email,
      password,
    });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case UserAlreadyExistsError:
          throw new ConflictException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }
  }
}
