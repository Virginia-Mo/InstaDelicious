'use client'
import React, { useState} from 'react'
import { useSession } from 'next-auth/react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { object, string, mixed} from 'yup'
import { Button, TextField} from '@mui/material'
import Avatar from '@mui/material/Avatar';
import { useAppSelector } from '@/types/reduxTypes'
import { editProfile } from '@/async_calls/edit'

const schema = object({
    image: mixed(),
    bio: string(),
}).required()

interface optionsForm {
  picture: string,
  bio: string,
  email: string,
  id: number,
  token: string
}

const SettingForm = () => {


  const [file, setFile] = useState(null)
  const user = useAppSelector((state) => state.persistedReducer.user.onlineUser)
const { data: session } = useSession()
    const {handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })
    const onSubmitImage = async ( data: any, e : Event) => {
      let picture
       if (file) {
      const formData = new FormData()
      formData.append('file', file)
      formData.append("upload_preset", "Instadelicious");
      const fileData = await fetch(`https://api.cloudinary.com/v1_1/dps629xiv/image/upload`, {
        method: "POST",
        body: formData
      }) .then((res) => res.json())
      if (fileData.secure_url) {
        picture = fileData.secure_url
      }
      console.log("picture", fileData.secure_url)
    }
      const options : optionsForm = {
        picture: file ? picture : user.picture,
        bio: data.bio,
        email: user.email,
        id : user.id,
        token : session?.user.accessToken as string
      }
        editProfile(options)
  }

const onChangeImage = (e: any) => {
  const file = e.target.files[0];
  setFile(file)
}

  return (
<div>

<form action="" onSubmit={handleSubmit(onSubmitImage)} className='flex flex-col gap-7 items-center'>
      <div className='border-gray-200 border-2 rounded-lg flex flex-col gap-8 items-end px-5 py-4'>
        <div className='flex gap-4'> 
         <Avatar alt={user.username} src={user.picture} sx={{ width: 62, height: 62}} />
        <div>
            <p>{user.username}</p>
  <input 
  type="file"
  name="image"
  id="image"
  onChange={onChangeImage} 
  />
        </div>
</div> 
<div className='flex gap-4 '>
<p>Bio</p>
 <Controller
        name="bio"
        control={control}
        defaultValue={user.bio}
        render={({field}) => <TextField {...field}
        id='bio'
        type='text'
        variant='outlined'
        label=""
        className='w-80'
        placeholder={user.bio}
        helperText={errors?.bio ? errors?.bio?.message : null} 
        error={errors?.bio ? true : false}
    />  
}/> 
</div>
<Button type='submit' variant='outlined' className='w-80'>Submit</Button>

    </div>
    </form>
</div>

  )
}

export default SettingForm