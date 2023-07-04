'use client'

import { UserDB } from '@/Types/models'
import { getFollowers } from '@/redux/reducers/users'
import { useAppDispatch, useAppSelector } from '@/Types/reduxTypes'

export default function GetUserFollower (userInf : UserDB)  {
console.log("GO", userInf)
    const dispatch = useAppDispatch()
    const users  = useAppSelector((state) => state.persistedReducer.user.users)


    let followerArray : UserDB[] = []
    if (userInf !== undefined && Object.keys(userInf).length > 0) {
            if (userInf.follow[0] !== undefined) {
    let followerInfo : number[] = userInf.follow[0].follower_user_id  

    if (followerInfo.length > 0) {
      followerInfo.forEach((element : number) => {
        let foundPeople =  users.find((user) => user.id === element)

        if (foundPeople){
          followerArray.push(foundPeople)
        }
      })
      dispatch(getFollowers(followerArray))
        }
    } else {
        return []
    }
      }
    }