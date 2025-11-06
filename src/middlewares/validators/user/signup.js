import Joi from "joi";
import CustomError from "../../handleError.js";

const validateRegData = (req, res, next) => {
  if (!req.body) {
    return next(new CustomError(400, "Body Missing. Please send Data in JSON"));
  }
  console.log(req.body);
  const { fullName, email, password } = req.body;
  if (!fullName || !email || !password) {
    console.log("here 1");
    return next(
      new CustomError(
        400,
        "Fullname, Email and password are required. Found Missing"
      )
    );
  }

  const { firstName, middleName, lastName } = fullName;
  if (!firstName || !lastName) {
    console.log("here 2");
    return next(
      new CustomError(400, "FirstName and LastName are required. Found Missing")
    );
  }
  if (middleName && middleName.length > 10) {
    console.log("here 3");
    return next(
      new CustomError(400, "Middlename should not exceed 10 characters")
    );
  }

  const schema = Joi.object({
    firstName: Joi.string()
      .min(2)
      .max(15)
      .message("First name must contains 2-15 characters")
      .required(),
    middleName: Joi.allow(),
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
    console.log("error came");
    return next(new CustomError(400, error.details[0].message));
  }
  next();
};

export default validateRegData;
