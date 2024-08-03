'use client'
import { useEffect, useState } from 'react'
import { getAllTodo, query } from '@/app/data/todoData'
import { useMemo } from 'react'

import { MaterialReactTable, MRT_ColumnDef, useMaterialReactTable } from 'material-react-table'
import { GET_ALL_USER } from '@/app/graphql/userGraphql'
import { Todo } from '@/types/todoType'
import { User } from '@/types/userType'

const Todos = () => {
  const [data, setTodos] = useState<Todo[]>([])
  const [users, setUsers] = useState<Array<User>>()
  const [loading, setLoading] = useState(true)

  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<Todo>[]>(
    () => [
      {
        accessorKey: 'userId', //access nested data with dot notation
        header: 'userId',
        size: 150
      },
      {
        accessorKey: 'id', //access nested data with dot notation
        header: 'id',
        size: 150
      },
      {
        accessorKey: 'title',
        header: 'title',
        size: 150
      }
    ],
    []
  )

  // let todoData: any[]
  const table = useMaterialReactTable({
    columns,
    enableGlobalFilter: true,
    data //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
  })
  const fetchUsersData = async () => {
    const usersData = await getAllTodo()
    setTodos(usersData)
  }
  const fetchUsersData2 = async () => {
    const usersData = await query(GET_ALL_USER)
    console.log(usersData)
    setUsers(usersData.users)
  }

  useEffect(() => {
    fetchUsersData2()
    fetchUsersData()

    setLoading(false)
  }, [])

  return (
    <>
      {users === undefined ? (
        <span>
          <p>Loading...</p>
        </span>
      ) : (
        <div className='px-4 mt-4'>
          {users.map(item => (
            <li key={item.id}>{item.name}</li>
          ))}
          {users.map(post => (
            <li className='mb-3' key={post.id}>
              {post.id}
            </li>
          ))}
          <MaterialReactTable table={table} />
        </div>
      )}
    </>
  )
}
export default Todos
