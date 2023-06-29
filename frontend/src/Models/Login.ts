export class Login {
  public email: string;
  public password: string;

  public constructor(login: Login) {
    this.email = login.email;
    this.password = login.password;
  }
}
