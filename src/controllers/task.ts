import { getTasks, getTask, createTask, updateTask, deleteTask, findTask } from '../models/task';
import { Request, Response} from 'express';

export default class TaskController {
  /**
   * TaskController instance for singleton.
   */
  private static taskController: TaskController;

  /**
   * Returns an instance of TaskController. It creates a new one if there is none.
   */
  static getInstance(): TaskController {
    if (!this.taskController) {
      this.taskController = new TaskController();
    }

    return this.taskController;
  }

  /**
   * Returns all the taks for the given user.
   */
  async getAll(req: Request, res: Response) {
    const userId: string = req.oidc?.user?.sub;

    this.assertUserId(userId);

    const tasks = await getTasks();

    res.json(tasks);
  }

  /**
   * Returns a task for the given id and user.
   */
  async getOneById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const userId = req.oidc?.user?.sub;

    this.assertUserId(userId);

    const task = await findTask({ userId, id });

    res.json(task);

  }

  /**
   * Creates a new task for the given user.
   */
  async create(req: Request, res: Response) {
    const payload = req.body;
    const userId = req.oidc?.user?.sub;

    this.assertUserId(userId);

    const task = await createTask({
      ...payload,
      userId,
    });

    res.json(task);
  }

  /**
   * Updates a task with the given data for the given task id and user.
   */
  async update(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const payload = req.body;
    const userId: string = req.oidc?.user?.sub;

    this.assertUserId(userId);

    const task = findTask({ userId, id });
    if (!task) {
      res.status(500).send('Unknown task.');
      return;
    }

    const updatedTask = updateTask(id, payload);

    res.json(updatedTask);
  }

  /**
   * Deletes a task with the given id.
   */
  async delete(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const userId: string = req.oidc?.user?.sub;

    const task = findTask({ userId, id });
    if (!task) {
      res.status(500).send('Unknown task.');
      return;
    }

    const deletedTask = deleteTask(id);

    res.json(deletedTask);
  }

  /**
   * Throws an error if the userId is not defined.
   */
  private assertUserId(userId: String) {
    if (!userId) {
      throw new Error('Authentication required');
    }
  }
}