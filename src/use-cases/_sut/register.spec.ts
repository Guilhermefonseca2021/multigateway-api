import { faker } from "@faker-js/faker";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "../../repositories/prisma/in-memory/in-memory-users-repository";
import { RegisterUseCase } from "./../register";

let usersRepository: InMemoryUsersRepository;
let sut: RegisterUseCase;

describe("Create Product Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new RegisterUseCase(usersRepository);
  });
  it("should be able to create a new user", async () => {
    const user = await sut.execute({
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: "admin",
    });

    expect(user.user.email).toEqual(expect.any(String));
  });
});
