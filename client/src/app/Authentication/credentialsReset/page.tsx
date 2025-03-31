"use client"
import {useState } from "react";
import VerifyEmail from "@/app/Authentication/credentialsReset/verifyEmail/index";
import VerifyOtp from "@/app/Authentication/credentialsReset/verifyOtp/index";
import NewPassword from "@/app/Authentication/credentialsReset/newPassword/index";


const Page = () => {
  const [page, setPage] = useState<string>("VerifyEmail");
  const [otp, setOtp] = useState<number>(0);
  const [userId, setUserId] = useState<string>("");
  const [email,setEmail]=useState<string>("");

  const emailCallBackFunck = (userId: string,email:string) => {
    setUserId(userId);
    setEmail(email);
    setPage("VerifyOtp")
  }
  const otpCallBackFunck = (otp: number) => {
    setOtp(otp);
    setPage("NewPassword")
  }
  const NewPasswordCallBackFunck = () => {
    setPage("VerifyEmail")
  }

  return (
    <div className="mb-5">
      {page == "VerifyEmail" && <VerifyEmail callBackFunc={emailCallBackFunck} />}
      {page == "VerifyOtp" && <VerifyOtp callBackFunc={otpCallBackFunck} email={email}userId={userId} />}
      {page == "NewPassword" && <NewPassword callBackFunck={NewPasswordCallBackFunck} otp={otp} userId={userId} />}
    </div>
  )
}


export default Page;
