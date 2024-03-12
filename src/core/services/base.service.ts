import { PrismaClient } from "@prisma/client";

export class BaseService {
  constructor(protected readonly db = new PrismaClient()) {}

  connect() {
    this.db.$connect();
  }

  disconnect() {
    this.db.$disconnect();
  }
}
