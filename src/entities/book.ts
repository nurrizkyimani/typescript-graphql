import { Field, ID, InputType, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@InputType()
@ObjectType()
@Entity()
export class Book extends BaseEntity {
  
  @PrimaryGeneratedColumn("uuid")
  @Field(type => ID) 
  id: string


  @PrimaryColumn()
  @Field()
  title: string;

  @Column()
  @Field()
  author: string; 
}

