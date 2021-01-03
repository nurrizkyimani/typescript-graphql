import { Arg, Args, Field, InputType, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { Book } from "../entities/book";


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


@ObjectType()
class ResponseData {

  @Field()
  success: number
  
  @Field()
  message: string

  @Field()
  data : Book
}

//resolver itself; 
@Resolver()
export class BookResolver {


  //find all books
  @Query(() => [Book] )
  async readBooks(): Promise<Book[] | undefined> {
    return Book.find()
  }
  
  //find by id 
  @Query(() => Book)
  async readBookById( @Arg("id", { nullable: false }) id: string,): Promise<Book | undefined > {
    return await Book.findOne({
      where: {
        id : id
      }
    })
  }

  //add books
  @Mutation(() => Response)
  addBook(@Arg("Book") newBookData: AddBookInput): Response  {  
    try {
      Book.insert(newBookData)
      return new Response(200, "sucesss");
  
    } catch (error) {
      return new Response(400, "failed in the response")
    } 
  }

  
  @Mutation(() => Response)
  async deleteBook(@Arg("id", { nullable: false }) id: string): Promise<Response> {
    try {

        await getConnection()
        .createQueryBuilder()
        .delete()
        .from(Book)
        .where("id = :id", { id: id  })
        .execute();
      
      // Book.delete(id)
      return new Response(200, "sucesss");
      

    } catch (error) {
      return new Response(400, "failed in the response")
    }
  }
  
}
  

