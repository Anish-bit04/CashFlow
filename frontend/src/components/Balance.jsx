import { useEffect, useState } from "react";
import axios from 'axios'

export const Balance = () => {
  const [value, setvalue] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:4000/api/v1/account/balance", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then((res)=>setvalue(res.data.balance))
  }, []);
  return (
    <div className="flex">
      <div className="font-bold text-lg">Your balance</div>
      <div className="font-semibold ml-4 text-lg">Rs {parseFloat(value.toFixed(2))}</div>
    </div>
  );
};
