import { gql } from '@apollo/client';


export const GET_REPOSITORIES = gql`
query Repositories($searchKeyword: String) {
  repositories(searchKeyword: $searchKeyword) {
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
    }
  }
}
`;

export const GET_REPOSITORIES_HIGHEST_RATED = gql`
  query {
    repositories(orderBy: RATING_AVERAGE) {
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
      }
    }
  }
`;

export const GET_REPOSITORIES_LOWEST_RATED = gql`
  query {
    repositories(orderBy: RATING_AVERAGE, orderDirection: ASC) {
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
  {
    me {
      id
      username
    }
  }
`;

export const GET_REVIEWS = gql`
  query Repositories($repositoryId: ID!) {
    repository(id: $repositoryId) {
      reviews {
        edges {
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
