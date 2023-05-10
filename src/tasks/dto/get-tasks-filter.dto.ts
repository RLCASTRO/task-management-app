import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../tasks.model';
export class GetTasksFilterDto {
  //The ? means both fields are optional
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
  @IsOptional()
  @IsString()
  search?: string;
}
