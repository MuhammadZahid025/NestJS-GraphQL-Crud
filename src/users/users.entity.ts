import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Product } from 'src/products/entities/product.entity';
import { Tasks } from 'src/tasks/entities/tasks.entity';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Address } from './entities/address.entity';

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

    @OneToOne(() => Address, {
        eager: true,
        cascade: true
    })
    @JoinColumn()
    address: Address

    @ManyToMany((product)=>Product)
    product: Product[];
}
