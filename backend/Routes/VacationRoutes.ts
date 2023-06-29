import express, { NextFunction, Request, Response } from "express";
import path from "path";
import { addVacation, allVacations, deleteVacation, editVacation, getSingleVacation } from "../Logic/VacationLogic";
import verifyToken from "../MiddleWare/verifyToken";
import verifyAdmin from "../MiddleWare/verifyAdmin";
import { Vacation } from "../Models/Vacation";

const router_Vacations = express.Router();

router_Vacations.get("/allVacations", verifyToken, async (request: Request, response: Response, next: NextFunction) => {
  try {
    const result = await allVacations();
    response.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

router_Vacations.get("/vacation/:id", [verifyToken, verifyAdmin], async (request: Request, response: Response, next: NextFunction) => {
  try {
    const id = +request.params.id;
    const result = await getSingleVacation(id);
    response.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

router_Vacations.post("/addVacation", [verifyToken, verifyAdmin], async (request: Request, response: Response, next: NextFunction) => {
  try {
    request.body.image_file = request.files?.image_file;
    const newVacation = new Vacation(request.body);
    const result = await addVacation(newVacation);

    response.status(201).json(result);
  } catch (err) {
    next(err);
  }
});

router_Vacations.patch("/editVacation/:id", [verifyToken, verifyAdmin], async (request: Request, response: Response, next: NextFunction) => {
  try {
    request.body.vacation_id = +request.params.id;
    // Check if new image file exists, use image name if not
    request.body.image_file = request.files?.image_file || (request.body.image_name = request.body.image_file);

    const edit = new Vacation(request.body);
    const result = await editVacation(edit);

    response.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

router_Vacations.delete("/vacation/delete/:image/:id", [verifyToken, verifyAdmin], async (request: Request, response: Response, next: NextFunction) => {
  try {
    const id = +request.params.id;
    const image = request.params.image;

    const result = await deleteVacation(image, id);

    response.status(204).json(result);
  } catch (err) {
    next(err);
  }
});

// GET Image for fontend
router_Vacations.get("/vacation/image/:image_name", (request: Request, response: Response, next: NextFunction) => {
  const image_name = request.params.image_name;
  const full_path = path.join(__dirname, "..", "assets", "images", image_name);
  response.sendFile(full_path);
});

export default router_Vacations;
