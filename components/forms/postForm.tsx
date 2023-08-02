'use client'
import React, { useState} from 'react'
import { useSession } from 'next-auth/react'
import { Controller, useForm, useFieldArray } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { object, string, mixed} from 'yup'
import { Button, TextField} from '@mui/material'
import Avatar from '@mui/material/Avatar';
import { useAppSelector } from '@/types/reduxTypes'
import { editProfile } from '@/async_calls/edit'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const schema = object({
    picture: mixed().required(),
    title: string().required(),
    details : mixed(),
    ingredients : mixed(),
    description : mixed()
}).required()

interface optionsForm {
  picture: string,
  title: string,
  details: string,
  ingredients: string,
  description: string
}

const PostForm = () => {
    
        const {register, handleSubmit, control, formState: { errors } } = useForm({
            defaultValues: {
            ingredients: [{ingredient : ""}]
          },resolver: yupResolver(schema),
        })
            
      const { fields, append, remove } = useFieldArray({
        control,
        name: "ingredients"
      });

  const [file, setFile] = useState(null)
  const user = useAppSelector((state) => state.persistedReducer.user.onlineUser)
    const { data: session } = useSession()

    const handleSubmitForm =  ( ) => {

        console.log("dfghn")
    //   let image
    //    if (file) {
    //   const formData = new FormData()
    //   formData.append('file', file)
    //   formData.append("upload_preset", "Instadelicious");
    //   const fileData = await fetch(`https://api.cloudinary.com/v1_1/dps629xiv/image/upload`, {
    //     method: "POST",
    //     body: formData
    //   }) .then((res) => res.json())
    //   if (fileData.secure_url) {
    //     image = fileData.secure_url
    //   }
    //   console.log("picture", fileData.secure_url)
    // }
    //   const options : optionsForm = {
    //     url: file ? image : user.image,
    //     title: data.bio,
    //     details: user.email,
    //     ingredients : user.id,
    //     description : "here",
    //     token : session?.user.accessToken as string,
    //     authorId : 2,

    //   }
    //     editProfile(options)
  }

const onChangeImage = (e: any) => {
  const file = e.target.files[0];
  console.log(file)
  setFile(file)
}

  return (

<form action="" onSubmit={handleSubmit(handleSubmitForm)} className='flex flex-col gap-7 items-center'>
      <div className='border-gray-200 border-2 rounded-lg flex flex-col gap-8 items-end px-5 py-4'>
       
         
  <input 
  type="file"
  name="picture"
  id="picture"
  onChange={onChangeImage} 
  />
   
   <Controller
        name="title"
        control={control}
        defaultValue=''
        render={({field}) => <TextField {...field}
        id='title'
        type='text'
        variant='outlined'
        label="Title"
        className='w-80'
        // helperText={errors?.title ? errors?.title?.message : null} 
        // error={errors?.title ? true : false}
    />  
}/> 
<Controller
        name="details"
        control={control}
        defaultValue=''
        render={({field}) => <TextField {...field}
        id='description'
        type='text'
        variant='outlined'
        label="Description"
        className='w-80'
        // helperText={errors?.description ? errors?.description?.message : null} 
        // error={errors?.description ? true : false}
    />  
}/> 


{fields.map((item, index) => (
          <li key={item.id} className='list-none'>
 {/* <input {...register(`ingredients.${index}.ingredient`)} /> */}
            {/* <Controller
              render={({ field }) => <input {...field} />}
              name={`ingredients.${index}`}
              control={control}
            /> */}
            <Controller
              name={`ingredients.${index}.ingredient`}
              control={control}
              render={({field}) => <TextField {...field}
            //   id={`ingredients.${index}`}
              type='text'
              variant='outlined'
              label="Ingredient"
              className='w-80'
            //   helperText={errors?.ingredient ? errors?.ingredients?.message : null} 
            //   error={errors?.ingredients ? true : false}
          />  
      }/> 

              
                      </li>
        ))}

<p
        onClick={() => append({ingredient : ""})}
      >
        <AddCircleOutlineIcon />
      </p>


<Controller
        name="description"
        control={control}
        defaultValue=''
        render={({field}) => <TextField {...field}
        id='details'
        type='text'
        variant='outlined'
        label="Step to step"
        className='w-80'
        // helperText={errors?.details ? errors?.details?.message : null} 
        // error={errors?.details ? true : false}
    />  
}/> 


<Button type='submit' variant='outlined' className='w-80'>Submit here</Button>
</div>

    </form>
  )
}

export default PostForm