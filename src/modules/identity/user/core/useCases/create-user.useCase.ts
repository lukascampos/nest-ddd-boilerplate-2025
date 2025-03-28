import { Injectable } from '@nestjs/common';
import { Either, left, right } from '@/shared/utils/either';
import { UsersRepository } from '../repositories/users.repository';
import { User } from '../entities/user';
import { UserAlredyExistsError } from '../errors/user-alredy-exists.error';
import { HashGenerator } from '../utils/cryptography/hash-generator';

type Input = {
  name: string;
  email: string;
  password: string;
}

type Output = Either<UserAlredyExistsError, { user: User }>

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly hashGenerator: HashGenerator,
  ) {}

  async execute({ name, email, password }: Input): Promise<Output> {
    const userAlredyExists = await this.usersRepository.findByEmail(email);

    if (userAlredyExists) {
      return left(new UserAlredyExistsError(email));
    }

    const hashedPassword = await this.hashGenerator.hash(password);

    const user = User.create({
      name,
      email,
      password: hashedPassword,
    });

    await this.usersRepository.create(user);

    return right({ user });
  }
}
