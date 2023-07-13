'use client'

import { UserDB } from "@/Types/models"
import { useAppSelector, useAppDispatch } from "@/types/reduxTypes"
import { getOnlineUserFollower, getOnlineUserFollowing } from "@/redux/reducers/users"
import { NextResponse } from "next/server"

export const GetFollow = (onlineUser : UserDB, users : UserDB[]) => {
console.log("HERE IT IS")

    let followerArray : UserDB[] = []
    let followingArray : UserDB[] = []

    if (onlineUser !== undefined && Object.keys(onlineUser).length > 0) {
    let followerInfo : number[] = onlineUser.follow[0].follower_user_id  
    let followingInfo : number[] = onlineUser.follow[0].following_user_id  

    if (followerInfo.length > 0) {
      followerInfo.forEach((element : number) => {
        let foundPeople =  users.find((user) => user.id === element)

        if (foundPeople){
          followerArray.push(foundPeople)
        }
      })
    //   dispatch(getOnlineUserFollower(followerArray))
        }

        if (followingInfo.length > 0) {
          followingInfo.forEach((element : number) => {
            let foundPeople2 =  users.find((user) => user.id === element)
    
            if (foundPeople2){
              followingArray.push(foundPeople2)
            }
          })
        //   dispatch(getOnlineUserFollowing(followingArray))
            }
console.log("followerArray", followerArray, "following", followingArray)
            return {"followerUser" : followerArray,
                                    "followingUser" :  followingArray}
      }
    }