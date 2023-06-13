'use client'

import Link from 'next/link'
import {useEffect } from 'react'
import { fetchUsers } from '@/redux/reducers/users'
import { useAppDispatch, useAppSelector } from '@/types/reduxTypes'
import { User } from '@/models/users'

export default function Home() {

const dispatch = useAppDispatch()
const users = useAppSelector((state) => state.users.users)

useEffect(()=> {
  dispatch(fetchUsers())
}, [dispatch])


  return (
    <main className="bg-red-100">
      <Link href="/about" >
      GO ! 
      </Link>
      <ul>
      {users.length >= 1 && 
      users.map((user: User) => (  
        <li className="text-4xl text-center" key={user.id}> {user.username} </li>
      ))
      } 
</ul>
    </main>
  )
}
