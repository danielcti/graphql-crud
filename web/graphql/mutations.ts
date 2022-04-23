import { gql } from "@apollo/client";

export const CREATE_TODOS_MUTATION = gql`
  mutation CreateTodos($data: TodosCreateInput!) {
    createTodos(data: $data) {
      id
      title
      completed
    }
  }
`;

export const UPDATE_TODOS_MUTATION = gql`
  mutation UpdateTodos($data: TodosUpdateInput!, $updateTodosId: String!) {
    updateTodos(data: $data, id: $updateTodosId) {
      id
      title
      completed
    }
  }
`;

export const DELETE_TODOS_MUTATION = gql`
  mutation DeleteTodos($deleteTodosId: String!) {
    deleteTodos(id: $deleteTodosId) {
      id
      title
      completed
    }
  }
`;
