import { useMutation } from "@apollo/client";
import {
  DELETE_TODOS_MUTATION,
  UPDATE_TODOS_MUTATION,
} from "../graphql/mutations";
import { GET_ALL_TODOS_QUERY } from "../graphql/queries";

interface Todo {
  id: string;
  completed: boolean;
  title: string;
}

interface TodoItemProps {
  data: Todo;
}

export const TodoItem = ({ data }: TodoItemProps) => {
  const [toggleTodo] = useMutation(UPDATE_TODOS_MUTATION, {
    refetchQueries: [{ query: GET_ALL_TODOS_QUERY }],
  });

  const [removeTodo] = useMutation(DELETE_TODOS_MUTATION, {
    refetchQueries: [{ query: GET_ALL_TODOS_QUERY }],
  });

  return (
    <div className="flex mb-4 items-center">
      <p className="w-full text-grey-darkest">{data.title}</p>
      <button
        onClick={() => {
          toggleTodo({
            variables: {
              updateTodosId: data.id,
              data: {
                completed: !data.completed,
              },
            },
          });
        }}
        className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green hover:bg-green"
      >
        {data.completed ? "Done" : "Not done"}
      </button>
      <button
        onClick={() => {
          removeTodo({
            variables: {
              deleteTodosId: data.id,
            },
          });
        }}
        className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red"
      >
        Remove
      </button>
    </div>
  );
};
