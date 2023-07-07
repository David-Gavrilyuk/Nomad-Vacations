//imports
import express, { NextFunction, Request, Response } from "express";
import fileUpload from "express-fileupload";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import router_Users from "./Routes/AuthRoutes";
import router_Likes from "./Routes/LikeRoutes";
import router_Vacations from "./Routes/VacationRoutes";
import ErrorHandler from "./MiddleWare/ErrorHandler";
import ErrorModel from "./Models/Errors";

dotenv.config();

//Create server
const server = express();

//Cors
server.use(cors({
  origin: "*"
}));

//Enable file uploading
server.use(fileUpload());

//Send the data
server.use(express.json());

//Parse the body as json
server.use(bodyParser.json());

//Routes
server.use("api/users", router_Users);
server.use("api/vacations", router_Vacations);
server.use("api/likes", router_Likes);

//Handle errors
server.use("*", (request: Request, response: Response, next: NextFunction) => {
  next(new ErrorModel(404, "Route not Found"));
});
server.use(ErrorHandler);

//Start the server
server.listen(process.env.WebPort, () => {
  console.log(`listinging on http://${process.env.MYSQL_HOST}:${process.env.WebPort}`);
});
