import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        username
        email
      }
    }
  }
`;

export const REGISTER_MUTATION = gql`
  mutation Register($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      token
      user {
        id
        username
        email
      }
    }
  }
`;

export const GET_PRODUCTS = gql`
  query GetProducts($skip: Int, $take: Int, $categoryIds: [ID], $userId: ID) {
    products(
      skip: $skip
      take: $take
      categoryIds: $categoryIds
      userId: $userId
    ) {
      id
      name
      description
      price
      user {
        id
        username
      }
      categories {
        id
        name
      }
      createdAt
    }
  }
`;

export const CREATE_PRODUCT = gql`
  mutation CreateProduct(
    $name: String!
    $description: String!
    $price: Float!
    $categoryIds: [ID!]!
  ) {
    createProduct(
      name: $name
      description: $description
      price: $price
      categoryIds: $categoryIds
    ) {
      id
      name
      description
      price
      categories {
        id
        name
      }
      createdAt
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id)
  }
`;

export const GET_PRODUCT = gql`
  query GetProduct($id: ID!) {
    product(id: $id) {
      id
      name
      description
      price
      categories {
        id
        name
      }
    }
    categories {
      id
      name
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct(
    $id: ID!
    $name: String
    $description: String
    $price: Float
    $categoryIds: [ID!]
  ) {
    updateProduct(
      id: $id
      name: $name
      description: $description
      price: $price
      categoryIds: $categoryIds
    ) {
      id
      name
      description
      price
    }
  }
`;

export const GET_OTHER_PRODUCTS = gql`
  query GetOtherProducts($skip: Int, $take: Int, $excludeCurrentUser: Boolean) {
    products(skip: $skip, take: $take, excludeCurrentUser: $excludeCurrentUser) {
      id
      name
      description
      price
      user {
        id
        username
      }
      categories {
        id
        name
      }
      createdAt
    }
  }
`;

