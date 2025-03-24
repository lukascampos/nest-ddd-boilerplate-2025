import {
  Body, Controller, InternalServerErrorException, Post, UnauthorizedException, UsePipes,
} from '@nestjs/common';
import { IController } from 'src/common/interfaces/IController';
import { ZodValidationPipe } from 'src/shared/pipes/zod-validation.pipe';
import { z } from 'zod';
import { AuthenticateService } from './authenticate.service';

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>

@Controller('/sessions')
export class AuthenticateController implements IController<AuthenticateBodySchema, unknown> {
  constructor(
    private readonly authenticateService: AuthenticateService,
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(authenticateBodySchema))
  async handle(@Body() body: AuthenticateBodySchema) {
    const { accessToken, error } = await this.authenticateService.execute(body);

    if (error) {
      switch (error.error) {
        case 'Unauthorized':
          throw new UnauthorizedException(error.message);
        default:
          throw new InternalServerErrorException();
      }
    }

    return {
      access_token: accessToken,
    };
  }
}
