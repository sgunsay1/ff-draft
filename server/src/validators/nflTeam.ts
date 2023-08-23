import { body, check, param } from "express-validator";

const checkName = () =>
  param("name").notEmpty().withMessage('"name" should not be empty');

const NflTeamValidator = {
  create: () => {
    return [
      body("name").notEmpty().withMessage('"name" should not be empty'),
      body("bye")
        .notEmpty()
        .withMessage('"bye" should not be empty"')
        .isInt({ min: 5, max: 14 })
        .withMessage('"bye" should be an integer between 5 and 14'),
    ];
  },

  nameParam: () => {
    return [checkName()];
  },

  update: () => {
    return [
      checkName(),
      body("bye")
        .notEmpty()
        .withMessage('"bye" should not be empty"')
        .isInt({ min: 5, max: 14 })
        .withMessage('"bye" should be an integer between 5 and 14'),
    ];
  },
};

export default NflTeamValidator;
