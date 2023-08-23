import { body, param } from "express-validator";

const checkId = () =>
  param("id")
    .notEmpty()
    .withMessage('"id" should not be empty')
    .isInt({ min: 1 })
    .withMessage('"id" should be positive integer');

const PlayerValidator = {
  create: () => {
    return [
      body("wishlist")
        .optional()
        .isBoolean()
        .withMessage("'wishlist' should be a boolean value"),
      body("price")
        .optional()
        .isInt({ min: 1 })
        .withMessage("'price' should be a postive int value"),
      body("name").notEmpty().withMessage("'name' should not be empty"),
      body("teamName").notEmpty().withMessage("teamName' should not be empty"),
    ];
  },

  update: () => {
    return [checkId()];
  },
};

export default PlayerValidator;
