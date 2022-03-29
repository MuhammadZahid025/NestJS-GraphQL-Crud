import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateAddressDto {
    @Field()
    street: string;

    @Field()
    city: string;

    @Field()
    country: string;
}