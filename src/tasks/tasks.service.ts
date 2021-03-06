import { HttpStatus, Injectable, InternalServerErrorException, NotFoundException, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import {
  CreateTaskDto,
  CreateTaskPayload,
  DeleteTaskByUserId,
  FindAllInput,
  TaskDelInput,
  UpdateTaskDto,
} from './dto/dto/create-task.dto';
import { Tasks } from './entities/tasks.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Tasks)
    private tasksRepository: Repository<Tasks>,
    private readonly userService: UsersService,
  ) { }

  async createTask(createTaskDto: CreateTaskDto, userId: number,): Promise<CreateTaskPayload> {
    try {
      const { title, description } = createTaskDto;
      const user = await this.userService.findUserById(userId)
      const task = this.tasksRepository.create({
        title,
        description,
        userId: userId,
      });
      task.user = user;
      return {
        task: await this.tasksRepository.save(task),
        response: { status: 200, message: 'Task created Successfully' }
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async updateTaskByTaskId(updateTaskDto: UpdateTaskDto): Promise<Tasks> {
    try {
      const { id, title, description } = updateTaskDto;
      const updateTask = await this.tasksRepository.save({
        id,
        title,
        description,
      });
      return updateTask;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async deleteTaskByTaskId(taskDelInput: TaskDelInput): Promise<void> {
    try {
      const result = await this.tasksRepository.delete({
        id: taskDelInput.taskId,
      });
      console.log(result);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getAllTasks(findAllInput: FindAllInput): Promise<Tasks[]> {
    try {
      return this.tasksRepository.find({
        where: { userId: findAllInput.userId },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async deleteTaskByUserId(deleteTaskByUserId: DeleteTaskByUserId,): Promise<void> {
    try {
      const result = await this.tasksRepository.delete({
        userId: deleteTaskByUserId.userId,
      });
      console.log(result);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getAllTasksComp(): Promise<Tasks[]>{
    try {
      const allTasks = await this.tasksRepository.find()
      return allTasks
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }
}
