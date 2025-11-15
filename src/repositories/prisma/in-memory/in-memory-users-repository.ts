import { Prisma, User } from "@prisma/client";
import { randomUUID } from "crypto";
import { UsersRepository } from "../user-repository";

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = [];

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((item) => item.email === email);
    return user ?? null;
  }

  async findById(id: string): Promise<User | null> {
    const user = this.items.find((item) => item.id === id);
    return user ?? null;
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user: User = {
      id: randomUUID(),
      role: data.role,
      email: data.email,
      password: data.password,
    };

    this.items.push(user);
    return user;
  }

  async login(data: { email: string; password: string, role?: string }): Promise<User | null> {
    const user = this.items.find((item) => item.email === data.email && item.password === data.password);
    return user ?? null;
  }
}
