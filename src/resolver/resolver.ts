import { Arg, Args, Field, InputType, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { Book } from "../entities/book";

@Resolver()
export class BookResolver {
  

  @Query(() => [Book])
  async readBooks() : Promise<Book[]> {
    return Book.find()
  }

  @Mutation()
    addBook(@Arg("Book") newBookData: AddBookInput): Response | Error {  
    try {
      Book.insert(newBookData)
      return new Response(200, "sucesss");
    
    } catch (error) {
      throw Error(`error in resolver :  ${error}`)
    }
  
  }
}
  
@InputType()
class AddBookInput implements Partial<Book>{ 
  @Field()
  title: string;
  
  @Field()
  author: string; 

}

@ObjectType()
class Response {

  @Field()
  success: number

  @Field()
  message : string

  constructor(success: number, message: string) {
    this.success = success
    this.message = message
  }

}


