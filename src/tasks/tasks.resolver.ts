import {  UseGuards } from '@nestjs/common';
import {Query, Args, Mutation, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/users/jwt.guard';
import { Users } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import {CreateTaskDto,DeleteTaskByUserId,FindAllInput,TaskDelInput,UpdateTaskDto} from './dto/dto/create-task.dto';
import { Tasks } from './entities/tasks.entity';
import { TasksService } from './tasks.service';
import { CurrentUser } from '../users/user.decorator';

@Resolver()
export class TasksResolver {
constructor(private tasksService: TasksService,
          private userService: UsersService
) {}

@UseGuards(JwtAuthGuard)
@Mutation((returns) => Tasks)
async createTask(
@Args('createTaskDto') createTaskDto: CreateTaskDto,@CurrentUser() user: Users): Promise<Tasks> {    
return await this.tasksService.createTask(createTaskDto, user.id);
}

@UseGuards(JwtAuthGuard)
@Mutation((returns) => Tasks)
async updateTaskByTaskId(@Args('taskUpdate') updateTaskDto: UpdateTaskDto , @CurrentUser() user:Users): Promise<Tasks> {
return await this.tasksService.updateTaskByTaskId(updateTaskDto);
}

@UseGuards(JwtAuthGuard)
@Mutation((returns) => Tasks, { nullable: true })
async deleteTaskByTaskId(@Args('taskDeleteById') taskDelInput: TaskDelInput , @CurrentUser() user:Users): Promise<void> {
return await this.tasksService.deleteTaskByTaskId(taskDelInput);
}

@UseGuards(JwtAuthGuard)
@Query((returns)=>[Tasks])
async findAllTasks(@Args("findAll") findAllInput:FindAllInput , @CurrentUser() user:Users):Promise<Tasks[]>{
return await this.tasksService.getAllTasks(findAllInput)
}

@UseGuards(JwtAuthGuard)
@Mutation((returns) => Tasks, { nullable: true })
deleteTaskByUserId(@Args('taskDeleteByUserId') deleteTaskByUserId: DeleteTaskByUserId): Promise<void> {
return this.tasksService.deleteTaskByUserId(deleteTaskByUserId);
}


}
