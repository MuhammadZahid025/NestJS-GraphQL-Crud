import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Tasks } from 'src/tasks/entities/tasks.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Users {
    @PrimaryGeneratedColumn()
    @Field((type) => Int)
    id: number;

    @Column()
    @Field()
    name: string;

    @Column()
    @Field()
    email: string;

    @Column()
    @Field({ nullable: true })
    password: string;

    @OneToMany((type) => Tasks, (tasks) => tasks.user)
    tasks: Tasks[];
}
