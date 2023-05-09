import { Controller, Get } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './tasks.model';

@Controller('tasks') //this is the route localhost:3000/tasks
export class TasksController {
  //This will inject tasksService into this controller.
  constructor(private tasksService: TasksService) {} //the private automatically sets the taskService as a property of the class with a type of TasksService

  // The controller method to receive GET requests on the tasks endpoint
  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks(); //this will call the getAllTasks method from the injected service tasks.service
  }

  //You can have methods here
}
