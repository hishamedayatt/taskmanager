import { gql } from "@apollo/client";

export const GET_TASKS = gql`
  query {
    getTask {
      id
      title
      description
      status
      date
    }
  }
`;
