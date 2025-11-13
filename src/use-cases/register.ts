import { User } from "@prisma/client";
import { hash } from "bcrypt";
import { UsersRepository } from "../repositories/prisma/user-repository";

interface RegisterUseCaseRequest {
  email: string;
  password: string;
  role: string | undefined;
}

interface RegisterUseCaseResponse {
  user: User;
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
    role,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const userExists = await this.usersRepository.findByEmail(email);

    if (userExists) {
      throw new Error("❌ User with this email already exists.");
    }

    if (!role) {
      throw new Error("⚠️ Certify to declare your role.");
    }

    const password_hash = await hash(password, 8);

    const user = await this.usersRepository.create({
      email,
      password: password_hash,
      role,
    });

    return { user };
  }
}
