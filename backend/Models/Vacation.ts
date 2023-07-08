import { UploadedFile } from "express-fileupload";
import Joi from "joi";

export class Vacation {
  public vacation_id?: number;
  public destination: string;
  public description: string;
  public start_date: string;
  public end_date: string;
  public price: number;
  public image_name?: string;
  public image_file?: UploadedFile;

  public constructor(vacation: Vacation) {
    this.vacation_id = vacation.vacation_id;
    this.destination = vacation.destination;
    this.description = vacation.description;
    this.start_date = vacation.start_date;
    this.end_date = vacation.end_date;
    this.price = vacation.price;
    this.image_name = vacation.image_name;
    this.image_file = vacation.image_file;
  }

  public validatePost() {
    const result = Vacation.validatePostSchema().validate(this, {
      abortEarly: false,
    });
    return result.error || undefined;
  }

  public validatePatch() {
    const result = Vacation.validatePatchSchema().validate(this, {
      abortEarly: false,
    });
    return result.error || undefined;
  }

  private static validatePostSchema() {
    const dateValidate = new Date().setDate(new Date().getDate() - 1);

    const fileValidator = (file: UploadedFile, helpers: Joi.CustomHelpers) => {
      if (file.size > 5 * 1024 * 1024) {
        return helpers.error("any.invalid");
      }
      return file;
    };

    return Joi.object({
      vacation_id: Joi.forbidden(),
      destination: Joi.string().required().min(2).max(50),
      description: Joi.string().required().min(2).max(400),
      start_date: Joi.date().greater(dateValidate).message("Start date cannot be in the past").required(),
      end_date: Joi.date().min(Joi.ref("start_date")).required(),
      price: Joi.number().required().min(1).max(10000),
      image_name: Joi.string().required().min(4).max(50),
      image_file: Joi.object().required().custom(fileValidator).messages({
        "any.invalid": "Image file size should not exceed 5MB.",
      }),
    });
  }

  private static validatePatchSchema() {

    const fileValidator = (file: UploadedFile, helpers: Joi.CustomHelpers) => {
      if (file.size > 5 * 1024 * 1024) {
        return helpers.error("any.invalid");
      }
      return file;
    };
    
    return Joi.object({
      vacation_id: Joi.optional(),
      destination: Joi.string().required().min(2).max(50),
      description: Joi.string().required().min(2).max(400),
      start_date: Joi.date().required(),
      end_date: Joi.date().min(Joi.ref("start_date")).required(),
      price: Joi.number().required().min(1).max(10000),
      image_name: Joi.string().required().min(4).max(50),
      image_file: Joi.alternatives().try(Joi.object(), Joi.string()).optional().custom(fileValidator).messages({
        "any.invalid": "Image file size should not exceed 5MB.",
      }),
    });
  }
}
