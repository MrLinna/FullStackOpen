import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query Repositories(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
    ) {
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

export const ME = gql`
  query getCurrentUser($includeReviews: Boolean = false) {
    me {
      id
      username

      reviews @include(if: $includeReviews) {
        edges {
          node {
            id
            text
            rating
            repository {
              name
              ownerName
              id
            }
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
