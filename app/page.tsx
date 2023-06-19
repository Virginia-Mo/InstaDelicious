'use client'

import Link from 'next/link'
import ButtonSign from '@/components/profile/buttonCompo'


export default function Home() {
// useEffect(()=> {
//   dispatch(fetchComments())
//   console.log("comments",users)
// }, [dispatch])


  return (
      <main className="bg-red-100">
      <Link href="/about" >
      GO ! 
      </Link>
      <ul>
      {/* {users.length >= 1 && 
      users.map((user: User) => (  
        <li className="text-4xl text-center " key={user.id}> {user.username} </li>
      ))
      } 
      { } */}
</ul>
<ButtonSign />
    </main>
  )
}
