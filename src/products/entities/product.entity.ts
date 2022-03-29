import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Users } from 'src/users/users.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Product {

  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  productCode: number;

  @ManyToMany(()=>Users,(user:Users)=>user.product)
  @JoinTable()
  user: Users[]

}
