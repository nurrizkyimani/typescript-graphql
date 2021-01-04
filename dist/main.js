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
const type_graphql_1 = require("type-graphql");
const resolver_1 = require("./resolver/resolver");
const main = async () => {
    const connection = await typeorm_1.createConnection({
        type: 'postgres',
        host: 'localhost',
        port: 5433,
        username: 'nurrizkyimani',
        database: 'coba1',
        logging: true,
        synchronize: true,
        entities: [book_1.Book]
    });
    if (connection.isConnected) {
        console.log(`Database is connected via localhost`);
    }
    const server = new apollo_server_express_1.ApolloServer({
        schema: await type_graphql_1.buildSchema({
            resolvers: [resolver_1.BookResolver],
            validate: false
        })
    });
    const app = express_1.default();
    server.applyMiddleware({ app });
    app.listen({ port: 4000 }, () => console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`));
};
main().catch((err) => {
    console.error(err);
});
