export class UnauthorizedError extends Error {
  status = 401;

  constructor(message: string = "Unauthorized") {
    super(message);
  }
}
