import { Field, InputType, Int } from "@nestjs/graphql"
import { IsNumber, IsString, MaxLength } from "class-validator"

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
export class  TaskDelInput {
@Field(()=> Int)
taskId:number;    
}

@InputType()
export class DeleteTaskByUserId{
@Field(()=> Int)
userId:number;
}

@InputType()
export class FindAllInput {
@Field(()=>Int)
userId:number
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
@Field(type=>Int)
id: number

}