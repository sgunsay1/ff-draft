import { body, param } from "express-validator";

const ManagerValidator = {
  create: () => {
    return [
      body("id").optional().isUUID(4).withMessage('"id" should be UUIDv4'),
      body("name").notEmpty().withMessage('"name" should not be empty'),
    ];
  },

  update: () => {
    return [body("name").notEmpty().withMessage('"name" should not be empty')];
  },
};

export default ManagerValidator;
