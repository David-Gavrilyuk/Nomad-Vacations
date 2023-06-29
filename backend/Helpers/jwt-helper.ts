import jwt from "jsonwebtoken";
import { User } from "../Models/User";

const secretKey = "A&2fj*#kjasa&83";

const getNewToken = (user: User): string => {
  const payload = { user };
  const token = jwt.sign(payload, secretKey, { expiresIn: "2h" });
  return token;
};

const verifyToken = (authorizeHeader: any) => {
  return new Promise<boolean>((resolve) => {
    if (!authorizeHeader) {
      resolve(false);
      return;
    }

    // Header Format: "Bearer the-token"
    const token = authorizeHeader.split(" ")[1];

    if (!token) {
      resolve(false);
      return;
    }

    jwt.verify(token, secretKey, (err: any, payload: any) => {
      if (err) {
        resolve(false);
        return;
      }

      resolve(true);
    });
  });
};

const getUserFromToken = (authorizeHeader: any): any => {
  const token = authorizeHeader.split(" ")[1];

  const payload = jwt.decode(token);

  const user = (payload as any).user;

  return user;
};

export default { getNewToken, verifyToken, getUserFromToken };
