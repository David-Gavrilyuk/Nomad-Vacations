import dal_mysql from "../Utils/dal_mysql";
import { v4 as uuid } from "uuid";
import fs from "fs";
import path from "path";
import ErrorModel from "../Models/Errors";
import { Vacation } from "./../Models/Vacation";

const allVacations = async () => {
  const SQLcommand = `SELECT * FROM project_vacations.vacations;`;
  return await dal_mysql.execute(SQLcommand);
};

const getSingleVacation = async (id: number) => {
  const SQLcommand = `SELECT * FROM project_vacations.vacations WHERE vacation_id = ${id}`;
  return await dal_mysql.execute(SQLcommand);
};

const addVacation = async (newVacation: Vacation) => {
  // Handle Image
  const imgExtension = newVacation.image_file?.name.substring(newVacation.image_file.name.lastIndexOf("."));
  newVacation.image_name = uuid() + imgExtension;

  await newVacation.image_file?.mv("./assets/images/" + newVacation.image_name);

  // Validate new Vacation info
  const errors = newVacation.validatePost();
  if (errors) throw new ErrorModel(400, errors);
  delete newVacation.image_file; // delete after validation

  const SQLcommand = `INSERT INTO project_vacations.vacations
    (destination, description, start_date, end_date, price, image_name) 
    VALUES
    ('${newVacation.destination}',
    '${newVacation.description}',
    '${newVacation.start_date}',
    '${newVacation.end_date}', 
    '${newVacation.price}',
    '${newVacation.image_name}');`;

  return await dal_mysql.execute(SQLcommand);
};

const editVacation = async (editVacation: Vacation) => {
  // Handle Image
  if (editVacation.image_file?.name) {
    const imgExtension = editVacation.image_file.name.substring(editVacation.image_file.name.lastIndexOf("."));
    editVacation.image_name = uuid() + imgExtension;

    await editVacation.image_file.mv("./assets/images/" + editVacation.image_name);
  }

  // Validate new Vacation info
  const errors = editVacation.validatePatch();
  if (errors) throw new ErrorModel(400, errors);
  delete editVacation.image_file; // delete after validation

  const SQLcommand = `UPDATE project_vacations.vacations
    SET
    destination = '${editVacation.destination}',
    description = '${editVacation.description}',
    start_date = '${editVacation.start_date}',
    end_date = '${editVacation.end_date}',
    price = '${editVacation.price}',
    image_name = '${editVacation.image_name}'
    WHERE (vacation_id = '${editVacation.vacation_id}');`;
  return await dal_mysql.execute(SQLcommand);
};

const deleteVacation = async (image: any, id: number) => {
  const SQLcommand = `DELETE FROM project_vacations.vacations WHERE (vacation_id = '${id}');`;
  const filePath = path.join(__dirname, "..", "assets", "images", image);

  // Delete image
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Error deleting file:", err);
    } else {
      console.log("File deleted successfully");
    }
  });
  return await dal_mysql.execute(SQLcommand);
};

export { addVacation, allVacations, getSingleVacation, deleteVacation, editVacation };
