import { useQuery } from "@apollo/client";
import { AddTodoForm } from "../components/AddTodoForm";
import { TodoItem } from "../components/TodoItem";
import { GET_ALL_TODOS_QUERY } from "../graphql/queries";

interface Todo {
  id: string;
  completed: boolean;
  title: string;
}

interface GetAllTodosQueryData {
  allTodos: Todo[];
}

export default function Home() {
  const { loading, error, data } =
    useQuery<GetAllTodosQueryData>(GET_ALL_TODOS_QUERY);

  return (
    <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
      <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
        <div className="mb-4">
          <h1 className="text-grey-darkest">Todo List</h1>
          <AddTodoForm />
        </div>
        <div>
          {data?.allTodos?.map((todo) => (
            <TodoItem data={todo} key={todo.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
