import "reflect-metadata";
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Ctx,
  InputType,
  Field,
} from "type-graphql";
import { Todos } from "./Todos";
import { Context } from "./context";

@InputType()
export class TodosCreateInput {
  @Field(() => String)
  title!: string;

  @Field(() => Boolean)
  completed: boolean | undefined;
}

@InputType()
export class TodosUpdateInput {
  @Field(() => String, { nullable: true })
  title: string | undefined;

  @Field(() => Boolean, { nullable: true })
  completed: boolean | undefined;
}

@Resolver(Todos)
export class TodosResolver {
  @Query((returns) => Todos, { nullable: true })
  async todosById(@Arg("id") id: string, @Ctx() ctx: Context) {
    return ctx.prisma.todos.findUnique({
      where: { id },
    });
  }

  @Query((returns) => [Todos])
  async allTodos(@Ctx() ctx: Context) {
    return ctx.prisma.todos.findMany();
  }

  @Mutation((returns) => Todos)
  async createTodos(@Arg("data") data: TodosCreateInput, @Ctx() ctx: Context) {
    return ctx.prisma.todos.create({
      data: {
        title: data.title,
        completed: data.completed || false,
      },
    });
  }

  @Mutation((returns) => Todos, { nullable: true })
  async updateTodos(
    @Arg("id", (type) => String) id: string,
    @Arg("data") data: TodosUpdateInput,
    @Ctx() ctx: Context
  ) {
    const todo = await ctx.prisma.todos.findUnique({
      where: { id: id },
    });

    return ctx.prisma.todos.update({
      where: { id: id },
      data: {
        title: data.title || todo?.title,
        completed: data.completed || todo?.completed,
      },
    });
  }

  @Mutation((returns) => Todos, { nullable: true })
  async deleteTodos(
    @Arg("id", (type) => String) id: string,
    @Ctx() ctx: Context
  ) {
    return ctx.prisma.todos.delete({
      where: {
        id,
      },
    });
  }
}
