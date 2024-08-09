import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query Repository {
    repositories {
      edges {
        node {
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

export const ME = gql`
  {
    me {
      id
      username
    }
  }
`;
