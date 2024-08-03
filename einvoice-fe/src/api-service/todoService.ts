import axiosConfig from '.'
import { client } from '@/libs/apolloClient'
import { DocumentNode } from 'graphql'

export const todoServices = {
  getAllTodo: () => {
    //use axios to call api
    const url = '/todos'
    return axiosConfig.get(url)
  },
  getAllUser: async (query: DocumentNode) => {
    const response = await client.query({
      query: query,
      context: {}
    })
    return response
  }
}
