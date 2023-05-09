export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

//this will create a type for the status
export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}
