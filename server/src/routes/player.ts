import express from "express";
import Middleware from "../middleware";
import PlayerValidator from "../validators/player";
import PlayerController from "../controllers/player";
const router = express.Router();

router.post(
  "/",
  PlayerValidator.create(),
  Middleware.handleValidationError,
  PlayerController.create
);
router.get("/", Middleware.handleValidationError, PlayerController.getAll);
router.get("/:id", Middleware.handleValidationError, PlayerController.getById);
router.put(
  "/:id",
  PlayerValidator.update(),
  Middleware.handleValidationError,
  PlayerController.update
);

router.delete(
  "/:id",
  Middleware.handleValidationError,
  PlayerController.delete
);

export default router;
