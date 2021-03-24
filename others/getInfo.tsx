import gql from 'graphql-tag';

import { GraphQLClient } from './graphql-request';

const endpoint = 'https://api.github.com/graphql'

const graphQLClient = (val: string) => {
  return (
    new GraphQLClient(endpoint, {
      headers: {
        authorization: `Bearer ${val}`,
      },
    })
  )
}

export const getUserInfo = async (token: string): Promise<any> => {

  const query = gql`
    query { 
      viewer { 
        avatarUrl
        name
        login
        email
        bio
        repositories{
          totalCount
        }
        url,
        following {
          totalCount
        }
        followers {
          totalCount
        }
        createdAt
      }
   }
    `
  interface TData {
    query:
    {
      viewer:
      {
        avatarUrl: string;
        name: string;
        login: string;
        email: string;
        bio: string;
        repositories: { totalCount: number };
        url: string;
        following: { totalCount: number };
        followers: { totalCount: number };
        createdAt: string
      }
    }
  }

  const data: any = await graphQLClient(token).request<TData>(query)
  return data["viewer"]
}

export const getRepo = async (token: string): Promise<any> => {
  console.log("data")
  const query = gql`
  query { 
    viewer{
      repositories(first: 50){
        nodes {
            name
            description
            owner {
              login
            }
        }
      }
    }
  }
    `
  interface TData {
    query:
    {
      viewer:
      {
        repositories: {
          nodes: Array<{
            name: string;
            description: string;
            owner: {
              login: string;
            }
          }>
        }
      }
    }
  }

  const data: any = await graphQLClient(token).request<TData>(query)
  return data["viewer"]
}

