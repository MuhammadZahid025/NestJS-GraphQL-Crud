import { Field, ObjectType } from "@nestjs/graphql";


@ObjectType()
export class signInResponsePayload {
@Field()
status: number;

@Field()
message: string;
}


@ObjectType()
export class UserPayload {
@Field()
accessToken: string

@Field()
response?: signInResponsePayload;
}


@ObjectType()
export class UpdatedUser {
@Field()
name: string;
@Field()
email: string;
@Field()
password: string
}
