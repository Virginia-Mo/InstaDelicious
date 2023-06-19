'use client'

import { useSession, signIn, signOut } from "next-auth/react"
import React, { use, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/Types/reduxTypes"
import { Post, User, UserDB } from "@/Types/models"
import { AddLikes, MinusLikes } from "@/async_calls/likes"
import { fetchUser } from "@/redux/middlewares/users"


export default function ButtonSign () {
  const { data: session } = useSession()
  const dispatch = useAppDispatch()
  
  const user : UserDB = useAppSelector((state) => state.persistedReducer.user.user)

    useEffect(()=> { 
      if(session?.user){
      dispatch(fetchUser(session.user.userData.id))}
    }, [dispatch, session?.user])

    const AddOneLikes = (id: number) => {
      AddLikes(id)
    }
    const MinusOneLikes = (id: number) => {
      MinusLikes(id)
    }

    return (
      <>
      {user !== null && Object.keys(user).length > 0 &&
      
     <><p>Signed in as</p><br /><li>
            {user.posts.map((post: Post) => (
              <><div key={post.id}>
                <img src={post.url}
                  alt=""
                  width={500}
                  height={500} />
                
                  {post.comments.map((comment: any) => (
                   <div key={comment.id}>
                     <p className="text-orange-600">{comment.text}</p>
                    </div>
                  ))}
              </div>
              <div onClick={() => AddOneLikes(post.id)}>CLICK</div>
              <div onClick={() => MinusOneLikes(post.id)}>CLOCK</div>
              </>
            ))}</li><button onClick={() => signOut()}>Sign out</button></>
        
      }
       {user !== null && Object.keys(user).length === 0 &&
           <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
       }
       
   </>
 )
  }