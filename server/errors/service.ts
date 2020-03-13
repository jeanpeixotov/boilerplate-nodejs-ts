export class ServiceError extends Error {
  public data: any = null;

  constructor(save: string, data: any = {}) {
    super(save);
    this.data = data;
  }

  public toJSON(): { message: string, errors: any } {
    return {
      message: this.message,
      errors: this.data
    };
  }
}
