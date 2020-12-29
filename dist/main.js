"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var express = require('express');
var _a = require('apollo-server-express'), ApolloServer = _a.ApolloServer, gql = _a.gql;
var books = [
    {
        title: 'The Awakening',
        author: 'Kate Chopin',
    },
    {
        title: 'City of Glass',
        author: 'Paul Auster',
    },
];
var users = [
    {
        id: '123',
        email: 'nurrizkydfsdfs@gmi.com',
    },
    {
        id: '1234',
        email: 'asdfafdad@gmail.com'
    },
];
var typeDefs = gql(__makeTemplateObject(["\n\n  type Book{\n    title: String\n    author: String\n  }\n\n  type Resp {\n    success: Boolean\n    message: String\n  }\n\n  type User {\n    id: String!\n    email: String!\n  }\n\n  type Query {\n    hello: String\n    books: [Book]\n    user(id: String!) : User\n  }\n\n  type Mutation {\n    createBook(title: String, author: String): Resp \n  }\n\n\n"], ["\n\n  type Book{\n    title: String\n    author: String\n  }\n\n  type Resp {\n    success: Boolean\n    message: String\n  }\n\n  type User {\n    id: String!\n    email: String!\n  }\n\n  type Query {\n    hello: String\n    books: [Book]\n    user(id: String!) : User\n  }\n\n  type Mutation {\n    createBook(title: String, author: String): Resp \n  }\n\n\n"]));
var resolvers = {
    Query: {
        hello: function () { return 'Hello world!'; },
        books: function () { return books; },
    },
    Mutation: {
        createBook: function (title, author) {
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
var server = new ApolloServer({ typeDefs: typeDefs, resolvers: resolvers });
var app = express();
server.applyMiddleware({ app: app });
app.listen({ port: 4000 }, function () {
    return console.log("\uD83D\uDE80 Server ready at http://localhost:4000" + server.graphqlPath);
});
