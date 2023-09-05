'use client'
import React, { useState} from 'react'
import { useSession } from 'next-auth/react'
import { Controller, useForm, useFieldArray } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { object, string, mixed} from 'yup'
import { Button, TextField} from '@mui/material'
import { useAppSelector } from '@/types/reduxTypes'
import { editProfile } from '@/async_calls/edit'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import * as yup from 'yup';
import { AddPost } from '@/async_calls/posts'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import { Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation'

const schema = object({
    image: mixed(),
    title: string().required('Title is required').min(2, 'Title must be between 2 and 20 characters'),
    description : string().required('Description is required').min(2, 'Description must be between 2 and 20 characters'),
    ingredients : yup.array().of(
        yup.object().shape({
            ingredient: yup.string()})),
    details : string(),
}).required()

interface optionsForm {
    url: any,
    title: string,
    description: string,
    ingredients: string[],
    details: string,
    token: string,
    authorId: number
  }

const PostForm = () => {
    
        const { handleSubmit, control, formState: { errors } } = useForm({
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

    const handleSubmitForm =  async ( data : any, e : Event) => {
        
      const ingredientsArray : string[] = data.ingredients.map((ingredient: { ingredient: string }) => ingredient.ingredient)

      let image
        if (file) {
      const formData = new FormData()
      formData.append('file', file)
      formData.append("upload_preset", "Instadelicious");
      const fileData = await fetch(`https://api.cloudinary.com/v1_1/dps629xiv/image/upload`, {
        method: "POST",
        body: formData
      }) .then((res) => res.json())
      if (fileData.secure_url) {
        image = fileData.secure_url
      }
    }
      const options : optionsForm = {
        url: image,
        title: data.title,
        description: data.description,
        ingredients : ingredientsArray,
        details : data.details,
        token : session?.user.accessToken as string,
        authorId : user.id,
      }
      console.log(options)
        AddPost(options)
  }

const onChangeImage = (e: any) => {
  const file = e.target.files[0];
  console.log(file)
  setFile(file)
}

  return (
      <form action="" onSubmit={handleSubmit(handleSubmitForm)} className='flex flex-col gap-7 items-center'>
          <Swiper
            slidesPerView={1}
            modules={[Navigation]}
            className='w-full'
          >
      <div className='border-gray-200 border-2 rounded-lg flex flex-col gap-8 items-end px-5 py-4'> 
      <SwiperSlide>
<div>
      <Button
  variant="contained"
  component="label"
>
  Upload File
  <input 
  type="file"
  name="image"
  id="image"
  onChange={onChangeImage} 
  required
  hidden
  />
</Button>  
 
</div>
      </SwiperSlide>
      <SwiperSlide>
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
        helperText={errors?.title ? errors?.title?.message : null} 
        error={errors?.title ? true : false}
    />  
}/> 
<Controller
        name="description"
        control={control}
        defaultValue=''
        render={({field}) => <TextField {...field}
        multiline
        id='description'
        label="Description"
        className='w-80'
        helperText={errors?.description ? errors?.description?.message?.toString() : null} 
        error={errors?.description ? true : false}
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
              helperText={errors?.ingredients ? errors?.ingredients?.message?.toString() : null} 
              error={errors?.ingredients ? true : false}
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
        name="details"
        control={control}
        defaultValue=''
        render={({field}) => <TextField {...field}
        multiline
        id='details'
        variant='outlined'
        aria-label='Step to Step'
        label="Step to step"
        className='w-80'
        helperText={errors?.details ? errors?.details?.message?.toString() : null} 
        error={errors?.details ? true : false}
    />  
}/> 

<Button type='submit'  variant='outlined' className='w-80'>Submit</Button>
      </SwiperSlide>

</div> 
    </Swiper>

</form>

  )
}

export default PostForm