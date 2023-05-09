import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TasksService {
  private tasks: Task[] = []; //only this service has access to this private property

  //the controller needs to talk to the service
  //this will be public by default if you dont define the visibility modifier.
  public getAllTasks(): Task[] {
    return this.tasks;
  }

  public createTask(title: string, description): Task {
    //creates the task object
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    //pushes to the tasks array
    this.tasks.push(task);

    // returns the response to the controller, which will send the http response
    return task;
  }
}
