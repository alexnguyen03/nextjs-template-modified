import { client } from '@/libs/apolloClient'
import { todoServices } from '../../api-service/todoService'
import { DocumentNode, gql } from '@apollo/react-hooks'

export const getAllTodo = async () => {
  try {
    const resp = await todoServices.getAllTodo()

    return resp.data
  } catch (error) {
    console.log(error)
  }
}

export const query = async (query: DocumentNode) => {
  try {
    const resp = await todoServices.getAllUser(query)
    return resp.data
  } catch (error) {
    console.log(error)
    return error
  }
}
