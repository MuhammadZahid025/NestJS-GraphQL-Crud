import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Users } from '../users.entity';
import { CreateAddressDto } from './createAddress.dto';

@InputType()
export class CreateUserInput {
    @Field()
    name: string;

    @Field()
    email: string;

    @Field()
    password: string;

    // @Field({nullable: true})
    // address?: CreateAddressDto
}

@InputType()
export class DeleteUsserByIdInput {
    @Field()
    id: number
}

@InputType()
export class UpdateUserInput {
    @Field()
    email: string;

    @Field()
    password: string;

    @Field()
    updatedName: string;

    @Field()
    updatedPassword: string;
}


@ObjectType()
export class ResponsePayload {
    @Field()
    status: number;

    @Field()
    message: string;
}

@ObjectType()
export class CreatUserPayload {
    @Field()
    user: Users;

    @Field()
    response?: ResponsePayload;
}

@ObjectType()
export class DeleteUserResponsePayload {
    @Field()
    status: number;

    @Field()
    message: string;
}

@ObjectType()
export class DeleteUserPayload {

    @Field()
    response?: DeleteUserResponsePayload
}