import Joi from "joi";
import CustomError from "../../handleError.js";

const validateRegData = (req, res, next) => {
  if (!req.body) {
    return next(CustomError(400, "Body Missing. Pleasse send Data in JSON"));
  }
  console.log(req.body);
  const { fullName, email, password } = req.body;
  if (!fullName || !email || !password) {
  }
  const { firstName, middleName, lastName } = fullName;
  if (!firstName || !lastName) {
    return next(
      new CustomError(400, "FirstName and LastName are required. Found Missing")
    );
  }
  const schema = Joi.object({
    firstName: Joi.string()
      .min(2)
      .max(15)
      .message("First name must contains 2-15 characters")
      .required(),

    middleName: Joi.string()
      .max(10)
      .message("Middlename is not required but must not exceed 10 characters"),
    lastName: Joi.string()
      .min(2)
      .max(15)
      .message("Last name must contains 2-15 characters")
      .required(),

    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),

    password: Joi.string()
      .pattern(/^[A-Za-z0-9@#]{8,12}$/)
      .message(
        "Password must be 8-12 characters long and can only contain letters, numbers, @, and #."
      )
      .required(),
  });

  const { error } = schema.validate({
    firstName,
    lastName,
    middleName,
    email,
    password,
  });

  if (error) {
    return next(new CustomError(400, error.details[0].message));
  }
  next();
};

export default validateRegData;
