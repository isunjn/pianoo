class PanicError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PanicError";
  }
}

export default function panic(message: string): PanicError {
  return new PanicError(message);
}
