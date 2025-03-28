import { User } from '../user';

describe('User Entity', () => {
  it('should return a User instance', () => {
    const user = User.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    });

    expect(user).toBeInstanceOf(User);
  });

  it('should return the correct name', () => {
    const user = User.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    });

    expect(user.name).toBe('John Doe');
  });

  it('should return the correct email', () => {
    const user = User.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    });

    expect(user.email).toBe('john.doe@example.com');
  });

  it('should return the correct password', () => {
    const user = User.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    });

    expect(user.password).toBe('password123');
  });

  it('should return the correct createdAt', () => {
    const createdAt = new Date();

    const user = User.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      createdAt,
    });

    expect(user.createdAt).toBe(createdAt);
  });

  it('should return the correct updatedAt', () => {
    const updatedAt = new Date();

    const user = User.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      updatedAt,
    });

    expect(user.updatedAt).toBe(updatedAt);
  });

  it('should update the name and touch updatedAt', () => {
    const user = User.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    });

    const initialUpdatedAt = user.updatedAt;
    user.name = 'Jane Doe';

    expect(user.name).toBe('Jane Doe');
    expect(user.updatedAt).not.toBe(initialUpdatedAt);
  });

  it('should update the email and touch updatedAt', () => {
    const user = User.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    });

    const initialUpdatedAt = user.updatedAt;
    user.email = 'new.john.doe@example.com';

    expect(user.email).toBe('new.john.doe@example.com');
    expect(user.updatedAt).not.toBe(initialUpdatedAt);
  });

  it('should update the password and touch updatedAt', () => {
    const user = User.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    });

    const initialUpdatedAt = user.updatedAt;
    user.password = 'new.password123';

    expect(user.password).toBe('new.password123');
    expect(user.updatedAt).not.toBe(initialUpdatedAt);
  });
});
