export class UserAlredyExistsError extends Error {
  constructor(identifier: string) {
    super(`User "${identifier} alredy exists"`);
  }
}
