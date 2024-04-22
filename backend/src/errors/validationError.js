export class ValidationError extends Error {
  constructor(message, status) {
    super(message);
    this.statusCode = status;
  }
}
