"use client"
import axios from 'axios';
import React, { useState, useRef, ChangeEvent, KeyboardEvent, FormEvent, useEffect } from 'react';

interface VerifyOtpProps {
  callBackFunc: (otp: number) => void;
  userId:string;
  email:string;
}

const Page: React.FC<VerifyOtpProps> = ({ callBackFunc,userId,email }) => {
  const [status, setStatus] = useState<{ color: string, message: string }|null>(null);
  const [otp, setOtp] = useState<number[]>(new Array(6).fill(-1));
  const inputRefs = useRef<(HTMLInputElement | null)[]>(new Array(6).fill(null));
  const [time,setTime]=useState<number>(59);
  const [inRequest,setInrequest]=useState<boolean>(false);

  const handleSubmit =async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(inRequest)
      return;
    setInrequest(true)
    const otpValue = Number(otp.join(''));
  try {
    const response=await axios.post('/api/verifyOtp',{userId,otpValue});
    if(response.status===200){
    setStatus({color:"text-green-600",message:response.data.message})
    callBackFunc(otpValue);
    }
    else if(response.status===201)
      setStatus({color:"text-red-600",message:response.data.message})
    setInrequest(false)
  } catch (error) {
    setStatus({color:"text-red-600",message:"Something went wrong"})
    setInrequest(false)
  }
  }

  const handleOtpChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    setStatus(null)
    const value = event.target.value;
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value ? Number(value) : -1;
    setOtp(newOtp);

    // Move to next input if current field is filled
    if (index < 5 && value) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  const handleKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && otp[index] === -1 && index > 0) {
      setStatus(null)
      // Move to previous input on backspace
      inputRefs.current[index - 1]?.focus();
    }
  }

  const handleResend = async () => {
    try {
      setStatus(null)
      setTime(59);
      const response = await axios.post("/api/verifyEmail", { email });
      setStatus({color:"text-green-600",message:response.data.message})
    } catch (error) {
      setStatus({color:"text-red-600",message:"Something went wrong"})
    }
  };
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    timer = setInterval(() => {
        setTime((prevTime) => {
            if (prevTime <= 0) {
                if (timer) {
                    clearInterval(timer);
                }
                return 0;
            }
            return prevTime - 1;
        });
    }, 1000);

    return () => {
        if (timer) {
            clearInterval(timer);
        }
    };
}, [time]);

  return (
    <div className='flex flex-col h-full justify-center gap-2.5 text-[rgb(255,255,255,0.6)]'>
      <h1 className='text-[2rem] gradient-text font-bold'>Verify OTP</h1>
      <div className='text-[0.82rem]'>
        Looks like someone&#39;s manager just dropped a hefty Excel sheet in their lap... Time to verify your OTP and get back to business! We&#39;ve missed you too!
      </div>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-full mt-5'>
        <div className='flex justify-between gap-2'>
          {otp.map((digit, index) => (
            <div key={index} className='gradient-border h-[3.8rem] w-[3.8rem]'>
              <input
                type="text"
                maxLength={1}
                value={digit === -1 ? '' : digit}
                onChange={(e) => handleOtpChange(index, e)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                ref={(ref) => { inputRefs.current[index] = ref; }}
                className="h-full w-full bg-customPurple text-center outline-none text-[1.2rem] rounded-[5px]"
                required
              />
            </div>
          ))}
        </div>
        {status&&<div className={`${status?.color} text-[0.9rem]`}>{status?.message}</div>}
        {time==0?
        <div
          className="text-xs font-semibold flex justify-end mt-2  "
        >
          <div onClick={handleResend} className='text-[#FF00C7] cursor-pointer hover:text-[#8000FF]'>Resend</div>
        </div>:<div
          className="text-xs font-semibold flex justify-end gradient-text-animate mt-2"
        >
          {`Resend in ${time}`}
        </div>}
          <div className='gradient-border h-[3.8rem]'>
            <button type='submit' className='h-full w-full items-center justify-center bg-black rounded-[5px]'>
              <span className='gradient-text font-bold'>{inRequest?"Verifying.....":"Submit 🡪"}</span>
            </button>
          </div>
      </form>
    </div>
  )
}

export default Page;
