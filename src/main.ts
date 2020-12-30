import "reflect-metadata";
import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import { createConnection, Connection } from 'typeorm'
import { Book } from "./entities/book";



const main = async () => {
  

  const connection: Connection = await createConnection({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'nurrizkyimani',
    database: 'coba1',
    logging: true, 
    synchronize: true,
    entities: [Book]
  })

  if (connection.isConnected) {
    console.log(`Database is connected via localhost`)
  }


  const books = [
    {
      title: 'The Awakening',
      author: 'Kate Chopin',
    },
    {
      title: 'City of Glass',
      author: 'Paul Auster',
    },
    
  ];

  const users = [
    {
      id: '123',
      email: 'nurrizkydfsdfs@gmi.com',
    },
    {
      id: '1234',
      email: 'asdfafdad@gmail.com'
    },
  
    
  ];

  // Construct a schema, using GraphQL schema language
  const typeDefs = gql`

    type Book{
      title: String
      author: String
    }

    type Resp {
      success: Boolean
      message: String
    }

    type User {
      id: String!
      email: String!
    }

    type Query {
      hello: String
      books: [Book]
      user(id: String!) : User
    }

    type Mutation {
      createBook(title: String, author: String): Resp 
    }

  `;

  // Provide resolver functions for your schema fields
  const resolvers = {
    Query: {
      hello: () => 'Hello world!',
      books: () => books,
    },

    Mutation: {
      createBook: (title: string, author: string) => {
        books.push({
          title: title, 
          author: author
        })

        return {
          success: true, 
          message: 'successfully submited'
        }

      }
    }
  };

  const server = new ApolloServer({ typeDefs, resolvers });

  const app = express();
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );

}

main();