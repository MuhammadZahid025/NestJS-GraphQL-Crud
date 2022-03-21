import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Users } from 'src/users/users.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Tasks {
@PrimaryGeneratedColumn()
@Field((type) => Int)
id: number;

@Column()
@Field()
title: string;

@Column()
@Field()
description: string;

@Column()
@Field((type) => Int)
userId: number;

@ManyToOne((type) => Users, (user) => user.tasks, { cascade: true, onDelete: 'CASCADE' })
user: Users;
}
