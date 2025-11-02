export default class CustomError extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
    this.message = message;
  }
}

export const handleError = (err, req, res, next) => {
  console.log(err.message);
  if (err instanceof CustomError) {
    console.log("handled error");
    return res.status(err.code).json({ success: false, message: err.message });
  }
  return res
    .status(500)
    .json({ success: false, message: "Unhandled System Error" });
};
