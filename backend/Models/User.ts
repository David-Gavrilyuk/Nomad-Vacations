import Joi from "joi";
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

  public validatePost() {
    const result = User.postValidationSchema.validate(this, {
      abortEarly: false,
    });
    return result.error || undefined;
  }

  private static postValidationSchema = Joi.object({
    user_id: Joi.forbidden(),
    first_name: Joi.string()
      .required()
      .min(2)
      .max(20)
      .regex(/^[a-zA-Z].*$/)
      .message("First name cannot contain numbers"),
    last_name: Joi.string()
      .required()
      .min(2)
      .max(20)
      .regex(/^[a-zA-Z].*$/)
      .message("Last name cannot contain numbers"),
    email: Joi.string().email({ tlds: { allow: false } }),
    password: Joi.string()
      .required()
      .min(4)
      .max(12)
      .regex(/^[a-zA-Z0-9].*$/),
    role: Joi.number().optional().integer().min(Role.User).max(Role.Admin),
  });
}
