import {Task} from 'react-native';

export interface TasksRepository {
  getAll: () => Promise<Array<Task>>;
  findById: (id: string) => Promise<Task>;
  save: (task: Task) => Promise<Task>;
  delete: (task: Task) => void;
}
