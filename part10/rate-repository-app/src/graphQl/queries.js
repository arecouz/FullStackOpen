import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query Repositories(
    $searchKeyword: String
    $first: Int
    $after: String
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
  ) {
    repositories(
      searchKeyword: $searchKeyword
      first: $first
      after: $after
      orderBy: $orderBy
      orderDirection: $orderDirection
    ) {
      edges {
        node {
          id
          description
          forksCount
          fullName
          language
          ownerAvatarUrl
          stargazersCount
          reviewCount
          ratingAverage
        }
        cursor
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  query Repositories($repositoryId: ID!) {
    repository(id: $repositoryId) {
      id
      description
      forksCount
      fullName
      language
      ownerAvatarUrl
      stargazersCount
      reviewCount
      ratingAverage
      url
    }
  }
`;

export const ME = gql`
  query Me($includeReviews: Boolean = false, $first: Int, $after: String) {
    me {
      id
      username
      reviews(first: $first, after: $after) @include(if: $includeReviews) {
        edges {
          node {
            repository {
              name
              id
            }
            id
            createdAt
            rating
            text
            user {
              username
            }
          }
        }
        totalCount
        pageInfo {
          hasPreviousPage
          hasNextPage
          startCursor
          endCursor
        }
      }
      createdAt
    }
  }
`;

export const GET_REVIEWS = gql`
  query Repositories($repositoryId: ID!, $first: Int, $after: String) {
    repository(id: $repositoryId) {
      reviews(first: $first, after: $after) {
        totalCount
        pageInfo {
          hasPreviousPage
          hasNextPage
          startCursor
          endCursor
        }
        edges {
          cursor
          node {
            text
            user {
              username
            }
            rating
            createdAt
          }
        }
      }
    }
  }
`;
