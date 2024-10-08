import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signin = ({setisAuthenticated}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()

  const handleClick = async () => {
   const response= await axios.post("https://cashflow-backend-c0fr.onrender.com/api/v1/user/signin", {
      username,
      password,
    });
    localStorage.setItem("token", response.data.token);
    setisAuthenticated(true)
    navigate('/dashboard')
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <InputBox
            placeholder="test1@gmail.com"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            label={"Email"}
          />
          <InputBox
            placeholder="12345678"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label={"Password"}
          />
          <div className="pt-4">
            <Button onClick={handleClick} label={"Sign in"} />
          </div>
          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Sign up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
};

export default Signin;
