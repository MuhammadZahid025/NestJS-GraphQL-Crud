import { Field, InputType, Int, ObjectType } from "@nestjs/graphql"
import { IsNumber, IsString, MaxLength } from "class-validator"
import { Tasks } from "src/tasks/entities/tasks.entity";

@InputType()
export class CreateTaskDto {

    @IsString()
    @MaxLength(20)
    @Field()
    title: string

    @IsString()
    @MaxLength(50)
    @Field()

    description: string
}

@InputType()
export class TaskDelInput {
    @Field(() => Int)
    taskId: number;
}

@InputType()
export class DeleteTaskByUserId {
    @Field(() => Int)
    userId: number;
}

@InputType()
export class FindAllInput {
    @Field(() => Int)
    userId: number
}

@InputType()
export class UpdateTaskDto {
    @IsString()
    @MaxLength(20)
    @Field()
    title: string

    @IsString()
    @MaxLength(50)
    @Field()

    description: string

    @IsNumber()
    @Field(type => Int)
    id: number

}

@ObjectType()
export class CreateTaskResponsePayload {
    @Field()
    status: number;

    @Field()
    message: string;
}
@ObjectType()
export class CreateTaskPayload {
    @Field()
    task: Tasks;

    @Field()
    response?: CreateTaskResponsePayload;
}

ObjectType()
export class UpdateTaskResponsePayload {
    @Field()
    status: number;

    message: string;
}

ObjectType()
export class UpdateTaskPayLoad {
    @Field()
    task: Tasks;

    @Field()
    response?: UpdateTaskResponsePayload;
}


@ObjectType()
export class DeleteTaskByIdResponsePayload {
    @Field()
    status: number;

    @Field()
    message: string;
}



@ObjectType()
export class DeleteTaskbyIdPayload {

    @Field()
    response?: DeleteTaskByIdResponsePayload
}