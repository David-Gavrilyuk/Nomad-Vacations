import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();

//Creating a conneciton object
const connection = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

const execute = (sql: string): Promise<any> => {
  return new Promise<any>((resolve, reject) => {
    //Connection and execute the sql command
    connection.query(sql, (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      //No error
      resolve(res);
    });
  });
};

export default {
  execute,
};
