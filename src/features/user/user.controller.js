import CustomError from "../../middlewares/handleError.js";
import { addNewUser } from "./user.repository.js";

const signUp = async (req, res, next) => {
  try {
    const response = await addNewUser(req.body);
    if (response.code === 201) {
      const { email } = req.body;
      if (email.split("@")[1] === "test.com") {
        //don't send Email Now
        return res.status(response.code).json(response.result);
      }
    }
    //will setup mail when authentication is done
    return res.status(response.code).json(response.result);
  } catch (error) {
    return next(error);
  }
};

export { signUp };
