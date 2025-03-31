"use client";
import React, { useState, ChangeEvent, Suspense } from 'react';
import { MdMailOutline } from "react-icons/md";
import { useRouter, useSearchParams } from 'next/navigation';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import axios from 'axios';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [status, setStatus] = useState<{ color: string, message: string }|null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [inRequest,setInrequest]=useState<boolean>(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const message = searchParams?.get('message')||"";
  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if(inRequest)
        return;
      setInrequest(true)
      const response = await axios.post('/api/login', { email, password });

      if (response.status === 200) {
        setStatus({ color: 'text-green-600', message: 'Login successful!' });
        router.replace('/Disclaimer');
      } else {
        setStatus({ color: 'text-red-600', message: response.data.message });
      }
      setInrequest(false)
    } catch (error) {
      
      if(axios.isAxiosError(error)){
        if (error.response) {
          error.response.data.message
        }

      }


      setStatus({ color: 'text-red-600', message: 'Failed to log in' });
      setInrequest(false)
    }
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStatus(null);
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <div className='flex flex-col mb-5 h-full justify-center gap-2.5 text-[rgb(255,255,255,0.6)]'>
      <h1 className='text-[2rem] gradient-text font-bold'>Log In</h1>
      <div className='text-[0.82rem]'>
        Looks like someone&#39;s manager just dropped a hefty Excel sheet in their lap... Welcome back, we&#39;ve missed you too! 
        <span className='font-bold '>{` ${message}`}</span>
      </div>
      <form onSubmit={handleLogin} className='flex flex-col gap-4 w-full mt-5'>
        <div className='gradient-border h-[3.8rem]'>
          <div className='h-full flex bg-customPurple items-center gap-2 px-4 rounded-[5px]'>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              className="h-full grow bg-transparent outline-none text-[0.8rem] "
              placeholder="Enter Email"
              required
            />
            <MdMailOutline className='text-2xl' />
          </div>
        </div>
        <div className='gradient-border h-[3.8rem]'>
          <div className='h-full flex bg-customPurple items-center gap-2 px-4 rounded-[5px]'>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              className='h-full grow bg-transparent outline-none text-[0.8rem] appearance-auto'
              placeholder="Enter Password"
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
              <div className='flex justify-center gap-1 items-center gradient-text font-bold'> {inRequest?"Verifying.....":<><div>Next</div><span>&#x1F86A;</span></>}</div>
            </button>
          </div>
      </form>
      <div className='flex gap-1 justify-center text-[0.75rem]'>
        <div>Join Our Waitlist Now!</div>
        <button onClick={() => { router.push("/Authentication/requestAccess") }} className='gradient-text-animate font-bold'>Request Access</button>
      </div>
    </div>
  );
}



export default function Page() {
  return (
      <Suspense>
          <LoginPage/>
      </Suspense>
  )
}
