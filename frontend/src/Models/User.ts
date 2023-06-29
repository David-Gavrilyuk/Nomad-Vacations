import Role from "./Role";

export class User {
  public user_id?: number;
  public first_name: string;
  public last_name: string;
  public email: string;
  public password: string;
  public role?: Role;

  public constructor(user: User) {
    this.user_id = user.user_id;
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.email = user.email;
    this.password = user.password;
    this.role = user.role;
  }
}
