import { useMutation } from "@apollo/client";
import { useState } from "react";
import { CREATE_TODOS_MUTATION } from "../graphql/mutations";
import { GET_ALL_TODOS_QUERY } from "../graphql/queries";

export const AddTodoForm = () => {
  const [createTodo] = useMutation(CREATE_TODOS_MUTATION, {
    refetchQueries: [{ query: GET_ALL_TODOS_QUERY }],
  });
  const [inputText, setInputText] = useState("");

  return (
    <div className="flex mt-4">
      <input
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
        placeholder="Add Todo"
      />
      <button
        onClick={async () => {
          await createTodo({
            variables: {
              data: {
                completed: false,
                title: inputText,
              },
            },
          });
          setInputText("");
        }}
        className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal"
      >
        Add
      </button>
    </div>
  );
};
