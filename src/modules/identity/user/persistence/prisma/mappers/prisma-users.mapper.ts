import { Prisma, User as PrismaUser } from '@prisma/client';
import { User } from '../../../core/entities/user';

export class PrismaUsersMapper {
  static toDomain(raw: PrismaUser) {
    return User.create(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.id,
    );
  }

  static toPrisma(user: User): Prisma.UserUncheckedCreateInput {
    return {
      id: user.id.toString(),
      name: user.name,
      email: user.email,
      password: user.password,
    };
  }
}
