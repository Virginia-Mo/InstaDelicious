import axios from 'axios'
import { redirect } from 'next/navigation'

interface stateType {
    email: string,
    password: string ,
    username: string ,
  }
  
  export const AddNewUser = async (data : stateType) => {
      try {
        console.log("API signup")
          const response = await axios.post(`/api/signup`, 
           {
              email : data.email,
              password : data.password,
              username : data.username,
          })
          console.log(response)
          if (response.status === 200) {
              window.location.href = "/"
          }
          return response
      } catch (error) {
          return error
      }
  }