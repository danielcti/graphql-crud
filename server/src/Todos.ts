import "reflect-metadata";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
export class Todos {
  @Field((type) => ID)
  id!: number;

  @Field((type) => String)
  title!: string;

  @Field((type) => Boolean)
  completed!: boolean;
}
