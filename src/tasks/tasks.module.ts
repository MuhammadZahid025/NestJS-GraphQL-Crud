import { forwardRef, Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksResolver } from './tasks.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tasks } from './entities/tasks.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
imports: [TypeOrmModule.forFeature([Tasks]), forwardRef(() => UsersModule) ],
providers: [TasksService, TasksResolver],
exports: [],
})
export class TasksModule {}
