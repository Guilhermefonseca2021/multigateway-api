import { User } from "@prisma/client";
import { compare } from "bcrypt";
import { UsersRepository } from "../repositories/prisma/user-repository";

interface LoginUseCaseRequest {
  email: string;
  password: string;
}

interface LoginUseCaseResponse {
  user: User;
}

export class LoginUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: LoginUseCaseRequest): Promise<LoginUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new Error("❌ Email or password incorrect.");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("❌ Email or password incorrect.");
    }

    return { user };
  }
}
