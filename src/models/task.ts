import { getConnection } from "../db";
import { ITask } from "ts/interfaces";

const COLLECTION_NAME = 'tasks';

/**
 * Gets the next id
 */
const getNextSequence = (): number => {
  const tasks = getTasks();
  const lastTask = tasks[tasks.length -1];
  
  return lastTask ? lastTask.id + 1 : 0;
}

/**
 * Gets all the tasks
 */
export const getTasks = () => {
  const data = getConnection().get(COLLECTION_NAME).value();

  return data;
};

/**
 * Creates a new tasl
 * @param data 
 */
export const createTask = (data: ITask) => {
  const newTask = { ...data, id: getNextSequence() };

  getConnection().get(COLLECTION_NAME).push(newTask).write();

  return newTask;

};

/**
 * Returns a task for the given id.
 * @param id 
 */
export const getTask = (id: number) => {
  const taskFound = getConnection()
    .get(COLLECTION_NAME)
    .find({ id })
    .value();

  if (!taskFound) {
    throw new Error('Task was not found.')
  }

  return taskFound;
};

/**
 * Searches for a task by the given criteria
 * @param criteria 
 */
export const findTask = (criteria: Partial<ITask>) => {
  const tasksFound = getConnection()
    .get(COLLECTION_NAME)
    .find(criteria)
    .value();

  return tasksFound;
}

/**
 * Deletes a task by the given id.
 * @param id 
 */
export const deleteTask = (id: number) => {
  const taskFound = getConnection()
    .get(COLLECTION_NAME)
    .find({ id })
    .value();

  if (!taskFound) {
    throw new Error('Task was not found.')
  }

  const deletedTask = getConnection()
    .get(COLLECTION_NAME)
    .remove({ id })
    .write();

  return deletedTask;
};

/**
 * Updates a task
 * @param id 
 * @param data 
 */
export const updateTask = (id: number, data: ITask) => {
  const taskFound = getConnection()
    .get(COLLECTION_NAME)
    .find({ id })
    .value();

  if (!taskFound) {
    throw new Error('Task was not found.')
  }

  const updatedTask = getConnection()
    .get(COLLECTION_NAME)
    .find({ id })
    .assign(data)
    .write();

  return updatedTask;
};
