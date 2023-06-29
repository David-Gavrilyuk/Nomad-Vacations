import dal_mysql from "../Utils/dal_mysql";
import jwtHelper from "../Helpers/jwt-helper";
import ErrorModel from "../Models/Errors";
import { Login } from "../Models/Login";
import { User } from "./../Models/User";

const loginUser = async (user: Login) => {
  const errors = user.validatePost();
  if (errors) throw new ErrorModel(400, errors);

  const SQLcommand = `SELECT * FROM users WHERE email = '${user.email}' AND password = '${user.password}';`;
  const userExists = await dal_mysql.execute(SQLcommand);

  if (!userExists[0]) {
    throw new ErrorModel(401, "Email or password are incorrect");
  }

  const { user_id, first_name, last_name, role } = userExists[0];
  const token = jwtHelper.getNewToken(userExists);

  return { user: { user_id, first_name, last_name, role }, token };
};

const registerUser = async (newUser: User) => {
  const errors = newUser.validatePost();
  if (errors) throw new ErrorModel(400, errors);

  const emailTaken = await checkEmailExists(newUser.email);

  if (emailTaken[0].email) {
    throw new ErrorModel(400, "Email is already taken");
  }

  const SQLcommand = `INSERT INTO project_vacations.users 
  (first_name, last_name, email, password) 
  VALUES ('${newUser.first_name}', '${newUser.last_name}', '${newUser.email}', '${newUser.password}');`;

  await dal_mysql.execute(SQLcommand);

  const token = jwtHelper.getNewToken(newUser);

  return token;
};

const checkEmailExists = async (email: any) => {
  const SQLcommand = `SELECT COUNT(*) AS email FROM users WHERE email = '${email}'`;
  return await dal_mysql.execute(SQLcommand);
};

export { registerUser, loginUser };
