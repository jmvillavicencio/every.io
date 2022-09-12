import { TaskStatus } from './enums';

export interface ITask {
  id: number,
  title: string
  description: string,
  status: TaskStatus,
  userId: string,
};
