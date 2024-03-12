import { PrismaClient, User } from "@prisma/client";
import { TLoginInput, TRegisterInput } from "../../types";
import { LoginInputSchema, RegisterInputSchema } from "../../schemas";
import {
  checkPassword,
  hashPassword,
  inputValidation,
  tokenDecode,
  tokenEncode,
} from "../helpers";
import { ConflictError, UnauthorizedError } from "../errors";
import { BaseService } from "./base.service";

export class AuthService extends BaseService {
  constructor(protected readonly db = new PrismaClient()) {
    super(db);
  }

  single(id: number): Promise<User | null> {
    return this.db.user.findFirst({
      where: { id },
    });
  }

  async login(
    input: TLoginInput
  ): Promise<{ user: User; accessToken: string }> {
    inputValidation(LoginInputSchema, input);
    const user = await this.db.user.findFirst({
      where: { email: input.email },
    });
    if (!user || !checkPassword(input.password, user.password)) {
      throw new UnauthorizedError(`Invalid credentials`);
    }
    return { user, accessToken: tokenEncode({ userId: user.id }) };
  }

  async register(input: TRegisterInput): Promise<User> {
    inputValidation(RegisterInputSchema, input);
    input.password = hashPassword(input.password);
    const hasEmail = await this.db.user.findFirst({
      where: { email: input.email },
    });
    if (hasEmail) {
      throw new ConflictError(`E-mail already exists`);
    }
    const user = await this.db.user.create({ data: input });
    return user;
  }

  async verify(accessToken?: string): Promise<User> {
    if (!accessToken) {
      throw new UnauthorizedError();
    }
    const decoded = tokenDecode(accessToken) as { userId: number };
    if (!decoded?.userId) {
      throw new UnauthorizedError();
    }
    const user = await this.db.user.findFirst({
      where: { id: decoded.userId },
    });
    if (!user) {
      throw new UnauthorizedError();
    }
    return user;
  }
}
