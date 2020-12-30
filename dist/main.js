"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const typeorm_1 = require("typeorm");
const book_1 = require("./entities/book");
const main = async () => {
    const connection = await typeorm_1.createConnection({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'nurrizkyimani',
        database: 'coba1',
        logging: true,
        synchronize: true,
        entities: [book_1.Book]
    });
    if (connection.isConnected) {
        console.log(`Database is connected via localhost`);
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
    const typeDefs = apollo_server_express_1.gql `

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
    const resolvers = {
        Query: {
            hello: () => 'Hello world!',
            books: () => books,
        },
        Mutation: {
            createBook: (title, author) => {
                books.push({
                    title: title,
                    author: author
                });
                return {
                    success: true,
                    message: 'successfully submited'
                };
            }
        }
    };
    const server = new apollo_server_express_1.ApolloServer({ typeDefs, resolvers });
    const app = express_1.default();
    server.applyMiddleware({ app });
    app.listen({ port: 4000 }, () => console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`));
};
main();
