"use client";

// The finally() method of Promise instances schedules a function to be called when the promise is settled (either fulfilled or rejected). It immediately returns an equivalent Promise object, allowing you to chain calls to other promise methods. This lets you avoid duplicating code in both the promise's then() and catch() handlers.

// IMPORTS -
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModal from "../hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../Inputs/Input";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

const onSubmit : SubmitHandler<FieldValues> = (data) => {

setIsLoading(true);

axios.post(`/api/register`, data).then(() => {

  registerModal.onClose();

}).catch((error) => {

console.error(error);

}).finally(() => {

  setIsLoading(false);

});
  }

const bodyContent = (
  <div className="flex flex-col gap-4">
<Heading title="Welcome to travel app"
subtitle="Create an account"/>
<Input 
id="email"
label="Email"
disabled={isLoading}
register={register}
errors={errors}
required
/>
  </div>
)


  return <>
  <Modal disabled={isLoading}
  isOpen={registerModal.isOpen}
  title="Register"
  actionLabel="Continue"
  onClose={registerModal.onClose}
  onSubmit={handleSubmit(onSubmit)}
  body={bodyContent}
  
  />
  </>;
};

export default RegisterModal;
