import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  controllers: [TasksController], //The controller is defined in this module
  providers: [TasksService], //The service is defined as a provider in this module, if the service has the @injectable decorator, it can be injected
})
export class TasksModule {}
