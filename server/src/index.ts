import "reflect-metadata";
import * as tq from "type-graphql";
import { ApolloServer } from "apollo-server";
import { context } from "./context";
import { TodosResolver } from "./TodosResolver";

const app = async () => {
  const schema = await tq.buildSchema({
    resolvers: [TodosResolver],
  });

  new ApolloServer({
    schema,
    context,
  }).listen(4000, () =>
    console.log("Server started on http://localhost:4000/graphql")
  );
};

app();
