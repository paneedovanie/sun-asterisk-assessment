export class ConflictError extends Error {
  status = 400;

  constructor(message: string) {
    super(message);
  }
}
