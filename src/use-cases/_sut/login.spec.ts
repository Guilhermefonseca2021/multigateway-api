import { faker } from "@faker-js/faker";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "../../repositories/prisma/in-memory/in-memory-users-repository";
import { LoginUseCase } from "../login";
import { hash } from "bcrypt";

let usersRepository: InMemoryUsersRepository;
let sut: LoginUseCase;

let existingUser: {
  email: string;
  password: string; 
  role: string;
};

describe("Login Use Case", () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository();
    sut = new LoginUseCase(usersRepository);

    const plainPassword = faker.internet.password();

    const password_hash = await hash(plainPassword, 8);

    existingUser = {
      email: faker.internet.email(),
      password: plainPassword,
      role: "admin",
    };

    await usersRepository.create({
      email: existingUser.email,
      password: password_hash,
      role: existingUser.role,
    });
  });

  it("should be able to login a user", async () => {
    const result = await sut.execute({
      email: existingUser.email,
      password: existingUser.password, 
    });

    expect(result.user.email).toEqual(existingUser.email);
  });
});
