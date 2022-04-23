import { gql } from "@apollo/client";

export const GET_ALL_TODOS_QUERY = gql`
  query {
    allTodos {
      id
      title
      completed
    }
  }
`;

export const GET_TODOS_BY_ID_QUERY = gql`
  query TodosById($todosByIdId: String!) {
    todosById(id: $todosByIdId) {
      id
      title
      completed
    }
  }
`;
