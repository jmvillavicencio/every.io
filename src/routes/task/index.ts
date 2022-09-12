import express from 'express';
import { requiresAuth } from 'express-openid-connect';
import TaskController from '../../controllers/task';
import TaskValidator from './validator';

const router = express.Router();
const taskController = TaskController.getInstance();
const taskValidator = TaskValidator.getInstance();

/**
 * @swagger
 * openapi: 3.0.0
 * components:
 *  securitySchemes:
 *    OpenID:
 *     type: openIdConnect
 *     openIdConnectUrl: https://example.com/.well-known/openid-configuration
 *  schemas:
 *    Task:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          description: the auto-generated id of task
 *        title:
 *          type: string
 *          description: the title of the task
 *        description:
 *          type: string
 *          description: the description of the task
 *        userId:
 *          type: string
 *          description: the user id
 *        status:
 *          type: string
 *          description: the task status
 *      required:
 *        - title
 *        - description
 *        - status
 *        - description
 *      example:
 *        id: gQBOyGbxcQy6tEp0aZ78X
 *        title: My first Task
 *        description: I have to do Something
 *        userId: google-oauth2|111734750598880396564
 *    TaskNotFound:
 *      type: object
 *      properties:
 *        msg:
 *          type: string
 *          description: A message for the not found task
 *      example:
 *        msg: Task was not found
 *
 *  parameters:
 *    taskId:
 *      in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: string
 *      description: the task id
 * 
 */

/**
 * @swagger
 * tags:
 *  name: Tasks
 *  description: Tasks endpoint
 */

// Middlewares
router.use(requiresAuth());

// GET
/**
 * @swagger
 * /task:
 *  get:
 *    summary: Returns a list of tasks
 *    tags: [Tasks]
 *    security:
*      - OpenID: [admin]
 *    responses:
 *      200:
 *        description: the list of tasks
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Task'
 */
router.get('/', taskController.getAll.bind(taskController));

/**
 * @swagger
 * /task/{id}:
 *  get:
 *    summary: get a task by Id
 *    tags: [Tasks]
 *    parameters:
 *      - $ref: '#/components/parameters/taskId'
 *    responses:
 *      200:
 *        description: The Found Task
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/Task'
 *      404:
 *        description: the task was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TaskNotFound'
 */
router.get('/:id', taskController.getOneById.bind(taskController));

/**
 * @swagger
 * /task:
 *  post:
 *    summary: create a new task
 *    tags: [Tasks]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Task'
 *    responses:
 *      200:
 *        description: the tasks was successfully created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Task'
 *      500:
 *        description: Some server error
 *
 */
router.post('/', taskValidator.getCreateTaskValidations(), taskController.create.bind(taskController));

/**
 * @swagger
 * /task/{id}:
 *  put:
 *    summary: Update a task by id
 *    tags: [Tasks]
 *    parameters:
 *      - $ref: '#/components/parameters/taskId'
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Task'
 *    responses:
 *      200:
 *        description: The updated task 
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/Task'
 *      404:
 *        description: the task was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TaskNotFound'
 *
 */
router.put('/:id', taskValidator.getUpdateTaskValidations(), taskController.update.bind(taskController));

/**
 * @swagger
 * /task/{id}:
 *  delete:
 *    summary: delete a task by id
 *    tags: [Tasks]
 *    parameters:
 *      - $ref: '#/components/parameters/taskId'
 *    responses:
 *      200:
 *        description: the task was deleted
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/Task'
 *      404:
 *        description: the task was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TaskNotFound'
 *
 */
router.delete('/:id', taskController.delete.bind(taskController));


export default router;