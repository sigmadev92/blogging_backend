import { Router } from "express";
import apiRouter from "./api.js";
import notFoundRoute from "../middlewares/notFoundRoute.js";
import { handleError } from "../middlewares/handleError.js";
const router = Router();

router.use("/api", apiRouter);

apiRouter.use(notFoundRoute);
apiRouter.use(handleError);

export default router;
