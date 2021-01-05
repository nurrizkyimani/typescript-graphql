import rest from 'msw'
import  setupServer  from "msw/node";
import gql from "apollo-server";
import createTestClient from "apollo-server-testing";
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { BookResolver } from '../resolver/resolver';
import { Connection, createConnection } from 'typeorm';
import { Book } from '../entities/book';



let connection : Connection

async function createServer() {
   const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [BookResolver],
      validate: false
    })
   });
  
  return server
}


import { graphql } from "graphql";
import { makeExecutableSchema } from "graphql-tools";



const schema = makeExecutableSchema({ typeDefs, resolvers: BookResolver });

export const graphqlTestCall = async (
  query: any,
  variables?: any,
  userId?: number | string
) => {
  return graphql(
    schema,
    query,
    undefined,
    {
      req: {
        session: {
          userId
        }
      },
      res: {
        clearCookie: () => {}
      }
    },
    variables
  );
};

beforeAll(async () => {
  connection = await createConnection({
    type: 'postgres',
    host: 'project_db',
    port: 5432,
    username: 'nurrizkyimani',
    password: 'password',
    database: 'coba1',
    logging: true, 
    synchronize: true,
    entities: [Book]
  })
})

afterAll(async () => {
  await connection.close()
})


const addBookMutation = `
  mutation addBookMutation($title: String!, $author: String!) {
    addBook(title: $title, author: $author)
`

describe("resolver", () => {
  test("return xxx", async () => {
    const testUser = { title: "dfsdfsd", author: "adsfadsfadfadf" }
    
    
    const registerResponse = await graphqlTestCall(registerMutation, {
      email: testUser.email,
      password: testUser.password
    });

  })
})


