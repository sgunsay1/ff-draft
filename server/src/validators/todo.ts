import { body, query, param } from "express-validator";

class TodoValidator {
  checkCreateTodo() {
    return [
      body("id")
        .optional()
        .isUUID(4)
        .withMessage("The value should be uuid v4"),
      body("title")
        .notEmpty()
        .withMessage("The title value should not be empty"),
      body("completed")
        .optional()
        .isBoolean()
        .withMessage("The value should be boolean")
        .isIn([0, false])
        .withMessage("the value should be 0 or false"),
    ];
  }

  checkReadTodo() {
    return [
      query("limit")
        .notEmpty()
        .withMessage("The query limit should not be empty")
        .isInt({ min: 1, max: 10 })
        .withMessage("the limit value should be a integer between 1 and 10"),
      query("offset")
        .optional()
        .isInt({ min: 0 })
        .withMessage("Offset value must be a positive integer"),
    ];
  }

  checkIdParam() {
    return [
      param("id")
        .notEmpty()
        .withMessage("The id value should not be empty")
        .isUUID(4)
        .withMessage("the id should be UUID v4"),
    ];
  }
}

export default new TodoValidator();
