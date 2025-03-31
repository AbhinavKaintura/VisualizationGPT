"use client"
import React, { useState, ChangeEvent } from 'react'
import { useRouter } from 'next/navigation';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import axios from 'axios';
interface newPasswordProps {
  userId: string;
  otp: number;
  callBackFunck: (page: string) => void
}

const Page: React.FC<newPasswordProps> = ({ userId, otp, callBackFunck }) => {
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [status, setStatus] = useState<{ color: string, message: string } | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [inRequest, setInrequest] = useState<boolean>(false);


  const route = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmPassword)
      setStatus({ color: "text-red-600", message: "Password doesn't match" })
    else {
      if (inRequest)
        return;
      setInrequest(true)
      try {
        const response = await axios.post('/api/newPassword', { userId, otp, password })
        if (response.status === 200) {
          setStatus({ color: "text-green-600", message: response.data.message })
          route.replace("/Authentication")
        }
        else {
          setStatus({ color: "text-red-600", message: response.data.message })
          callBackFunck("VerifyEmail")
        }
        setInrequest(false)
      } catch (error) {
        setStatus({ color: "text-red-600", message: "Something went wrong" })
        callBackFunck("VerifyEmail")
        setInrequest(false)
      }
    }
  }
  const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setStatus(null)
    setPassword(event.target.value);
  }

  const handleConfirmPassword = (event: ChangeEvent<HTMLInputElement>) => {
    setStatus(null)
    setConfirmPassword(event.target.value);
  }

  return (
    <div className='flex flex-col h-full justify-center gap-2.5 text-[rgb(255,255,255,0.6)]'>
      <h1 className='text-[2rem] gradient-text font-bold'>Change Password</h1>
      <div className='text-[0.82rem]'>
        Looks like someone&#39;s manager just dropped a hefty Excel sheet in their lap... Time to create your new password and get back to business! We&#39;ve missed you too!
      </div>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-full mt-5'>
        <div className='gradient-border h-[3.8rem]'>
          <div className='h-full flex bg-customPurple items-center gap-2 px-4 rounded-[5px]'>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePassword}
              className='h-full grow bg-transparent outline-none text-[0.8rem] appearance-auto'
              placeholder="Enter New Password"
              required
            />
            {showPassword ?
              <AiOutlineEye onClick={() => setShowPassword(false)} className='text-2xl' /> :
              <AiOutlineEyeInvisible onClick={() => setShowPassword(true)} className='text-2xl' />
            }
          </div>
        </div>
        <div className='gradient-border h-[3.8rem]'>
          <div className='h-full flex bg-customPurple items-center gap-2 px-4 rounded-[5px]'>
            <input
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={handleConfirmPassword}
              className='h-full grow bg-transparent outline-none text-[0.8rem] appearance-auto'
              placeholder="Confirm Password"
              required
            />
            {showPassword ?
              <AiOutlineEye onClick={() => setShowPassword(false)} className='text-2xl' /> :
              <AiOutlineEyeInvisible onClick={() => setShowPassword(true)} className='text-2xl' />
            }
          </div>
        </div>
        <div className={`${status?.color} text-[0.9rem]`}>{status?.message}</div>
        <div className='gradient-border h-[3.8rem]'>
          <button type='submit' className='h-full w-full items-center justify-center bg-black rounded-[5px]'>
            <span className='gradient-text font-bold'>{inRequest ? "Changing....." : "Submit 🡪"}</span>
          </button>
        </div>
      </form>
    </div>
  )
}

export default Page
