'use client'

import { AddPost } from '@/async_calls/posts'
import React from 'react'
import { useAppSelector } from '@/types/reduxTypes'

const About = () => {
  
const user  = useAppSelector((state) => state.persistedReducer.user.user)

  const [state, setState] = React.useState({
    title: '',
    description: '',
    details: '',
    ingredients: '',
    url: ''
  })
  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)
    console.log(data)
    AddPost(user.id, data)
  }
  return (
    <div>
       <h1>HAY {user.username}</h1> 
       <form className='flex'  action="" onSubmit={(e) => handleSubmit(e)}>
<label htmlFor="title">Title</label>
<input className='text-pink-300' value={state.title} onChange={(e)=> changeInput(e)} type="text" name="title" id="" />
<label htmlFor="description">Description</label>
<input className='text-pink-300' value={state.description} onChange={(e)=> changeInput(e)} type="text" name="description" id="" />
<label htmlFor="details">details</label>
<input className='text-pink-300' value={state.details} onChange={(e)=> changeInput(e)} type="text" name="details" id="" />
<label htmlFor="ingredients">Ingredients</label>
<input className='text-pink-300' value={state.ingredients} onChange={(e)=> changeInput(e)} type="text" name="ingredients" id="" />
<label htmlFor="url">Url</label>
<input className='text-pink-300' value={state.url} onChange={(e)=> changeInput(e)} type="text" name="url" id="" />
<button type="submit" className="joinclass__btn btnSubmit">Send Message</button>
       </form>
    </div>
  )
}

export default About