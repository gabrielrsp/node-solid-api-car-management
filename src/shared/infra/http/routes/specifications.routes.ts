import { CreateSpecificationController } from "@modules/cars/useCases/createSpecifications/CreateSpecificationsController";
import { Router } from "express";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.use(ensureAuthenticated);

specificationsRoutes.post("/", createSpecificationController.handle);

export { specificationsRoutes };
