import lowdb from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import { ITask } from './ts/interfaces'

type Schema = {
  tasks: ITask[];
};

let db: lowdb.LowdbSync<Schema>;

export const createConnection = async () => {
  const adapter = new FileSync<Schema>("db.json");
  db = lowdb(adapter);
  db.defaults({ tasks: [] }).write();
};

export const getConnection = () => db;
