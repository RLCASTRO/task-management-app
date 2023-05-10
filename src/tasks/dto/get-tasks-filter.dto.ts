import { TaskStatus } from '../tasks.model';
export class GetTasksFilterDto {
  //The ? means both fields are optional
  status?: TaskStatus;
  search?: string;
}
