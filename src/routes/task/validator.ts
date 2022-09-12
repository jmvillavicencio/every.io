import { body, validationResult } from 'express-validator';
import { TaskStatus } from '../../ts/enums';
import { Handler } from 'express';

const TITLE_VALIDATION = body('title').exists();
const DESCRIPTION_VALIDATION = body('description').exists();
const STATUS_EXISTS = body('status').exists();
const STATUS_IS_VALID = body('status').isIn(Object.values(TaskStatus));

const ErrorHandler: Handler = (req, res, next) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

export default class TaskValidator {
  private static taskValidator: TaskValidator;

  /**
   * Returns an instance of TaskValidator. It creates a new one if there is none.
   */
  static getInstance(): TaskValidator {
    if (!this.taskValidator) {
      this.taskValidator = new TaskValidator();
    }

    return this.taskValidator;
  }

  /**
   * Returns the validations for updating a task.
   */
  getUpdateTaskValidations() {
    return [
      TITLE_VALIDATION,
      DESCRIPTION_VALIDATION,
      STATUS_EXISTS,
      STATUS_IS_VALID,
      ErrorHandler
    ];
  }

  /**
   * Returns the validations for creating a task.
   */
  getCreateTaskValidations() {
    return [
      TITLE_VALIDATION,
      DESCRIPTION_VALIDATION,
      STATUS_EXISTS,
      STATUS_IS_VALID,
      ErrorHandler
    ];
  }
}