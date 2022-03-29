import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "../users.entity";


@Entity()
@ObjectType()
export class Address {
    @PrimaryGeneratedColumn()
    @Field((type) => Int)
    id: number;

    @Column()
    @Field({ nullable: true })
    street: string;

    @Column()
    @Field({ nullable: true })
    city: string;

    @Column()
    @Field({ nullable: true })
    country: string;


    @OneToOne(()=> Users , (user: Users)=>user.address)
    user: Users
}