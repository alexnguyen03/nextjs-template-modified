import { ApolloClient, InMemoryCache } from '@apollo/client'

export const client = new ApolloClient({
  uri: 'https://graphql-demo.mead.io/',
  cache: new InMemoryCache()
})
