"use client";
import React, { FormEventHandler, useState } from "react";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, ref } from "yup";
import { Button, TextField } from "@mui/material";
import { AddNewUser } from "@/async_calls/user/newUser";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";


const schema = object({
  username: string()
    .required("Username is required")
    .min(2, "Username must be between 2 and 20 characters")
    .max(20)
    .trim(),
  email: string()
    .required("Email is required")
    .email("Email is invalid")
    .trim(),
  password: string()
    .required("Password is required")
    .min(6, "Password must be between 6 and 20 characters")
    .max(20, "Password must be between 6 and 20 characters")
    .trim(),
  confirmPassword: string()
    .required("Please re-enter your password")
    .oneOf([ref("password")], "Passwords don't match !")
    .trim(),
  picture: string(),
}).required();

interface dataForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  picture: any;
}

const SignupForm = () => {
  const [error, setError] = useState("");
  const [file, setFile] = useState(null);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onChangeImage = (e: any) => {
    const file = e.target.files[0];
    setFile(file);
  };
  const onSubmit = async (data: dataForm) => {
    
    let image;
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "Instadelicious");
      const fileData = await fetch(
        `https://api.cloudinary.com/v1_1/dps629xiv/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      ).then((res) => res.json());
      if (fileData.secure_url) {
        image = fileData.secure_url;
      }
    }
    if (data.password !== data.confirmPassword) {
      setError("Passwords don't match !");
      return;
    }
    const options: dataForm = {
      username: data.username,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      picture: image,
    };
    AddNewUser(options);
  };

  return (
    <div className="flex items-center h-screen flex-col gap-14">
      <div className="mt-20">
        <h1 className="text-center text-black font-bold text-6xl font-sans">
          InstaDelicious
        </h1>
      </div>
      <form
        action=""
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-7 w-1/3 items-center border-gray-200 border-2 rounded-lg py-4"
      >
        <h2 className="text-center text-black font-bold text-3xl mt-4 font-mono">
          Create your account
        </h2>
        <Controller
          name="username"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              id="username"
              type="text"
              variant="standard"
              label="Username"
              className="w-80 "
              helperText={errors?.username ? errors?.username?.message : null}
              error={errors?.username ? true : false}
              placeholder="Enter your username"
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              id="email"
              type="email"
              variant="standard"
              label="Email"
              className="w-80 "
              helperText={errors?.email ? errors?.email?.message : null}
              error={errors?.email ? true : false}
              placeholder="Enter your email"
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              id="password"
              type="password"
              variant="standard"
              label="Password"
              className="w-80 "
              helperText={errors?.password ? errors?.password?.message : null}
              error={errors?.password ? true : false}
              placeholder="Enter your password"
            />
          )}
        />
        <Controller
          name="confirmPassword"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              id="confirmPassword"
              type="password"
              variant="standard"
              label="Confirm your Password"
              className="w-80 "
              helperText={errors?.password ? errors?.password?.message : null}
              error={errors?.password ? true : false}
              placeholder="Please re-enter your password"
            />
          )}
        />
  <div className="flex gap-2">
    <div className="flex items-center">
                  <Button
                    variant="contained"
                    component="label"
                    className="h-min" 
                    startIcon={<CloudUploadIcon />}
                  >
                    Profile photo
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
{ file && 
                  <img
                  src={URL.createObjectURL(file)}
                  alt="selected image"
                  className="img_profile"
                /> }
                </div>
        <Button type="submit" variant="outlined" className="mt-10 w-80">
          Submit
        </Button>
        <Button variant="outlined" className="mt-10 w-80" color="secondary">
          <Link href="/">Go to sign in Page</Link>
        </Button>
      </form>
    </div>
  );
};

export default SignupForm;
