import { gql } from '@apollo/react-hooks'

export const GET_ALL_USER = gql`
  {
    users {
      id
      name
      email
    }
  }
`
