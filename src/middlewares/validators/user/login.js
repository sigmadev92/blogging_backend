import Joi from "joi";
import CustomError from "../../handleError.js";

const validateLoginData = (req, res, next) => {
  if (!req.body) {
    return next(new CustomError(400, "Body missing. PLease send data in JSON"));
  }
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new CustomError(400, "Missing credentials"));
  }

  const schema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .message("Not a valid email format")
      .required(),

    password: Joi.string()
      .pattern(/^[A-Za-z0-9@#]{8,12}$/)
      .message(
        "Password must be 8-12 characters long and can only contain letters, numbers, @, and #."
      )
      .required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return next(new CustomError(403, error.details[0].message));
  }
  console.log("Login validation test cleared");
  next();
};

export default validateLoginData;
