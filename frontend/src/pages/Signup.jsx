import React from 'react'
import Heading from '../components/Heading'
import SubHeading from '../components/SubHeading'
import { BottomWarning } from '../components/BottomWarning'
import InputBox from '../components/InputBox'
import Button from '../components/Button'

const Signup = () => {
  return <div className="bg-slate-300 h-screen flex justify-center">
  <div className="flex flex-col justify-center">
    <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
      <Heading label={"Sign up"} />
      <SubHeading label={"Enter your infromation to create an account"} />
      <InputBox placeholder="Anish" label={"First Name"} />
      <InputBox placeholder="Choudhary" label={"Last Name"} />
      <InputBox placeholder="anishb2041@gmail.com" label={"Email"} />
      <InputBox placeholder="123456" label={"Password"} />
      <div className="pt-4">
        <Button label={"Sign up"} />
      </div>
      <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
    </div>
  </div>
</div>
}

export default Signup