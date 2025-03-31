"use client"
import axios from 'axios';
import React, { useState, ChangeEvent } from 'react'
import { MdMailOutline } from "react-icons/md";

interface VerifyEmailProps {
    callBackFunc: (userId: string, email:string) => void;
}

const Page: React.FC<VerifyEmailProps> = ({ callBackFunc }) => {
    const [email, setEmail] = useState<string>('');
    const [status, setStatus] = useState<{ color: string, message: string }|null>(null);
    const [inRequest,setInrequest]=useState<boolean>(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(inRequest)
          return;
        setInrequest(true)
        try {
            const response = await axios.post("/api/verifyEmail", {email});
            if(response.status===200){
            setStatus({ color: 'text-green-500', message: response.data.message });
            callBackFunc(response.data.userId,email);
            }
            else if(response.status===201){
              setStatus({ color: 'text-red-500', message: response.data.message });
            }
            setInrequest(false)
        } catch (error: any) {
            setStatus({ color: 'text-red-500', message: error.response?.data?.message || 'Something went wrong' });
            setInrequest(false)
        }
    }

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        setStatus(null)
        setEmail(event.target.value);
    }

    return (
        <div className='flex flex-col h-full justify-center gap-2.5 text-[rgb(255,255,255,0.6)]'>
            <h1 className='text-[2rem] gradient-text font-bold'>Verify Email</h1>
            <div className='text-[0.82rem]'>
                Looks like someone&#39;s manager just dropped a hefty Excel sheet in their lap... Time to verify your email and get back to business! We&#39;ve missed you too!
            </div>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-full mt-5'>
                <div className='gradient-border h-[3.8rem]'>
                    <div className='h-full flex bg-customPurple items-center gap-2 px-4 rounded-[5px]'>
                        <input
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            className="h-full grow bg-transparent outline-none text-[0.8rem]"
                            placeholder="Enter Email"
                            required
                        />
                        <MdMailOutline className='text-2xl' />
                    </div>
                </div>
                <div className={`${status?.color} text-[0.9rem]`}>{status?.message}</div>
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
