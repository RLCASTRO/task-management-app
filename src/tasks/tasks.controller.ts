import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks') //this is the route localhost:3000/tasks
export class TasksController {
  //This will inject tasksService into this controller.
  constructor(private tasksService: TasksService) {} //the private automatically sets the taskService as a property of the class with a type of TasksService

  // The TasksController method to receive GET requests on the tasks endpoint
  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks(); //this will call the getAllTasks method from the injected service tasks.service
  }

  @Get(':id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id); //this will call the getAllTasks method from the injected service tasks.service
  }

  @Delete(':id')
  deleteTaskById(@Param('id') id: string): Task[] {
    const index: number = this.tasksService.getTaskIndexById(id);
    return this.tasksService.getAllTasks().splice(index, 1);
  }

  //This controller method will handle POST requests on the tasks endpoint
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }

  //You can have methods here
}
