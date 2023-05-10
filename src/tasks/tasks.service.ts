import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = []; //only this service has access to this private property
  //the controller needs to talk to the service
  //this will be public by default if you dont define the visibility modifier.
  public getAllTasks(): Task[] {
    return this.tasks;
  }

  public getTaskById(taskId: string): Task {
    //filter the task by id
    return this.tasks.find((task) => task.id === taskId);
  }

  //this will return an array of tasks that does not have the id passed as argument
  public deleteTaskById(taskId: string): string {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
    return `Task number deleted`;
  }

  public updateTaskStatus(status: TaskStatus, id: string) {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }

  public createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
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
