import { gql } from "@apollo/client";

export const ADD_TASK = gql`
  mutation AddTask($title: String!, $description: String!, $status: String!, $date: Date) {
    addTask(title: $title, description: $description, status: $status, date: $date) {
      id
      title
      description
      status
      date
      
    }
  }
`;

export const DELETE_TASK = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id) 
  }
`;

export const UPDATE_TASK = gql`
  mutation UpdateTask(
    $id: ID!
    $title: String
    $description: String
    $status: String
    $date: Date
  ) {
    updateTask(id: $id, title: $title, description: $description, status: $status, date: $date) {
      id
      title
      description
      status
      date
    }
  }
`;
