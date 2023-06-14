'use client'

import { useSession, signIn, signOut } from "next-auth/react"
import React from "react"

const ButtonSign = () => {
  const { data: session } = useSession()
  console.log(session)
  if (session && session.user) {
    return (
      <>
        Signed in as {session.user.name} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}
export default ButtonSign