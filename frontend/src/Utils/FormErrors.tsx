function FormErrors({ error }: { error: any | null }): { [key: string]: string } {
  const errors: { [key: string]: string } = {};

  if (error) {
    const reformatMessage = (message: string) =>
      message
        .replace(/"/g, "")
        .replace(/ref:|_/g, " ")
        .replace(/(\b\w)(\w*)/, (_: any, firstChar: any, rest: any) => firstChar.toUpperCase() + rest);

    if (typeof error === "string") {
      errors["message"] = reformatMessage(error);
    } else if (error.details) {
      error.details.forEach((detail: any) => {
        const key = detail.path.join("_");
        errors[key] = reformatMessage(detail.message);
      });
    }
  }

  return errors;
}

export default FormErrors;
