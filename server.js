import express from "express";
import { ApolloServer, gql } from "apollo-server-express";

const app = express();

let db = [];

const schema = gql`
  type Query {
    register(username: String!, email: String!): User

    getAllUsers: [DB]!
  }

  type User {
    username: String!
    email: String!
  }

  type DB {
    username: String
    email: String
  }
`;

const resolvers = {
  Query: {
    register: (a, args, c) => {
      db.push(args);
      return args;
    },

    getAllUsers: () => {
      return db;
    },
  },
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
});

server.start().then(() => {
  server.applyMiddleware({ app, path: "/graphql" });
});

app.listen({ port: 8000 }, () => {
  console.log("Apollo Server on http://localhost:8000/graphql");
});
