import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query Repositories(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
  ) {
    repositories(orderBy: $orderBy, orderDirection: $orderDirection) {
      edges {
        node {
          id
          ownerAvatarUrl
          fullName
          description
          language
          stargazersCount
          forksCount
          reviewCount
          ratingAverage
        }
      }
    }
  }
`;

export const ME = gql`
  query Query {
    me {
      id
      username
    }
  }
`;

export const SINGLE_REPO = gql`
  query Repository($id: ID!) {
    repository(id: $id) {
      id
      fullName
      url
      reviewCount
      ratingAverage
      stargazersCount
      description
      language
      ownerAvatarUrl
      forksCount
    }
  }
`;
// nåäitä voisi laittaa fragmentteihin
export const REPO_REVIEWS = gql`
  query Repository($id: ID!) {
    repository(id: $id) {
      id
      fullName
      url
      reviewCount
      ratingAverage
      stargazersCount
      description
      language
      ownerAvatarUrl
      forksCount
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;
