export class ForbiddenError extends Error {
  status = 403;

  constructor(message: string = "Forbidden") {
    super(message);
  }
}
