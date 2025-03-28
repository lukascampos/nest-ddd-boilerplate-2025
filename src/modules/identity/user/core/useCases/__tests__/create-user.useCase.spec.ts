import { FakeHasher } from '@/modules/identity/user/core/utils/cryptography/__tests__/fake-hasher';
import { CreateUserUseCase } from '../create-user.useCase';
import { InMemoryUsersRepository } from '../../repositories/__tests__/in-memory-users.repository';
import { User } from '../../entities/user';

let inMemoryRepository: InMemoryUsersRepository;

let fakeHasher: FakeHasher;

let sut: CreateUserUseCase;

describe('Create User', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryUsersRepository();
    fakeHasher = new FakeHasher();

    sut = new CreateUserUseCase(inMemoryRepository, fakeHasher);
  });

  it('Should be able to create a new user', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual({
      user: inMemoryRepository.items[0],
    });
  });

  it('should hash user password upon creation', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const hashedPassword = await fakeHasher.hash('123456');

    expect(result.isRight()).toBe(true);
    expect(inMemoryRepository.items[0].password).toEqual(hashedPassword);
  });

  it('should an error if the user alredy exists', async () => {
    const user = User.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    inMemoryRepository.items.push(user);

    const result = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(result.isLeft()).toBe(true);
  });
});
