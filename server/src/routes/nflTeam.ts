import express from "express";
import Middleware from "../middleware";
import NflTeamValidator from "../validators/nflTeam";
import NflTeamController from "../controllers/nflTeam";
const router = express.Router();

router.post(
  "/",
  NflTeamValidator.create(),
  Middleware.handleValidationError,
  NflTeamController.create
);
router.get("/", Middleware.handleValidationError, NflTeamController.getAll);
router.get(
  "/:name",
  NflTeamValidator.nameParam(),
  Middleware.handleValidationError,
  NflTeamController.getById
);
router.put(
  "/:name",
  NflTeamValidator.update(),
  Middleware.handleValidationError,
  NflTeamController.update
);

router.delete(
  "/:name",
  NflTeamValidator.nameParam(),
  Middleware.handleValidationError,
  NflTeamController.delete
);

export default router;
