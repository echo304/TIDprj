// @flow

class User {
  email: string;
  username: string;

  set email(value: string): void {
    this.email = value;
  };
  get email(): string {
    return this.email;
  }

  set username(value: string): void {
    this.username = value;
  };
  get username(): string {
    return this.username;
  };
}
