import { Field, InputType, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@InputType()
@ObjectType()
@Entity()
export class Book extends BaseEntity {
  
  @PrimaryColumn()
  @Field()
  title: string;

  @Column()
  @Field()
  author: string; 
}

