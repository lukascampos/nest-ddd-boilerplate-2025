import {
  IsEmail, IsNotEmpty, IsString, IsStrongPassword,
} from 'class-validator';

export abstract class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  readonly password: string;
}
