import express from "express";
import Middleware from "../middleware";
import ManagerValidator from "../validators/manager";
import ManagerController from "../controllers/manager";
const router = express.Router();

router.post(
  "/",
  ManagerValidator.create(),
  Middleware.handleValidationError,
  ManagerController.create
);
router.get("/", Middleware.handleValidationError, ManagerController.getAll);
router.get("/:id", Middleware.handleValidationError, ManagerController.getById);
router.put(
  "/:id",
  ManagerValidator.update(),
  Middleware.handleValidationError,
  ManagerController.update
);

router.delete(
  "/:id",
  Middleware.handleValidationError,
  ManagerController.delete
);

export default router;
