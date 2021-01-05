import "reflect-metadata";
import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import { createConnection, Connection } from 'typeorm'
import { Book } from "./entities/book";
import { buildSchema } from "type-graphql";
import { BookResolver } from "./resolver/resolver";



const main = async () => {

  const connection: Connection = await createConnection({
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

  if (connection.isConnected) {
    console.log(`Database is connected via localhost`)
  }

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [BookResolver],
      validate: false
    })
  });

  const app = express();
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );

}

main().catch((err) => {
  console.error(err);
});