import { Controller, Get, Post, Body, Param, Delete, Patch, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Controller('tasks') //this is the route localhost:3000/tasks
export class TasksController {
  //This will inject tasksService into this controller.
  constructor(private tasksService: TasksService) {} //the private automatically sets the taskService as a property of the class with a type of TasksService

  // The TasksController method to receive GET requests on the tasks endpoint
  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
    //if any filter defined, call getTasksWithFilters
    if (Object.keys(filterDto).length) {
      //do something
      return this.tasksService.getTasksWithFilters(filterDto);
    } else {
      //otherwise, call getAllTasks
      return this.tasksService.getAllTasks(); //this will call the getAllTasks method from the injected service tasks.service
    }
  }

  @Get(':id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id); //this will call the getAllTasks method from the injected service tasks.service
  }

  @Delete(':id')
  deleteTaskById(@Param('id') id: string): string {
    return this.tasksService.deleteTaskById(id); //this will call the delete
  }

  //This controller method will handle POST requests on the tasks endpoint
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }

  @Patch('/:id/status')
  updateTaskStatus(@Body('status') status: TaskStatus, @Param('id') id: string): Task {
    return this.tasksService.updateTaskStatus(status, id);
  }

  //You can have methods here
}
