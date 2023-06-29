import Joi from "joi";

export class Login {
  public email: string;
  public password: string;

  public constructor(login: Login) {
    this.email = login.email;
    this.password = login.password;
  }

  public validatePost() {
    const result = Login.postValidationSchema.validate(this, {
      abortEarly: false,
    });
    return result.error || undefined;
  }

  private static postValidationSchema = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }),
    password: Joi.string()
      .required()
      .min(4)
      .max(12)
      .regex(/^[a-zA-Z0-9].*$/),
  });
}
