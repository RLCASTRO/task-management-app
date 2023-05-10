import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = []; //only this service has access to this private property
  //the controller needs to talk to the service
  //this will be public by default if you dont define the visibility modifier.
  public getAllTasks(): Task[] {
    return this.tasks;
  }

  public getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;
    //define a temp array to hold the tasks
    let tasks = this.getAllTasks();

    //do something with status
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    //do something with search
    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.toLowerCase().includes(search) || task.description.toLocaleLowerCase().includes(search)) {
          return true;
        }
        return false;
      });
    }

    //return final result
    return tasks;
  }

  public getTaskById(taskId: string): Task {
    //filter the task by id
    const found = this.tasks.find((task) => task.id === taskId);
    if (!found) {
      throw new NotFoundException(`Task with the id "${taskId}" does not exist`);
    }

    return found;
  }

  //this will return an array of tasks that does not have the id passed as argument
  public deleteTaskById(taskId: string) {
    const found = this.getTaskById(taskId);
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
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
