"use client"
import React, { useState, ChangeEvent } from 'react';
import { MdMailOutline } from "react-icons/md";
import { useRouter } from 'next/navigation';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import axios from 'axios';

interface InputFieldProps {
  type: string;
  value: string | number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
  icon?: React.ReactNode;
  min?: string;
  max?: string;
  pattern?: string
}

const InputField: React.FC<InputFieldProps> = ({ type, value, onChange, placeholder, required = false, icon, min, max, pattern }) => (
  <div className='gradient-border h-[3.8rem]'>
    <div className='h-full flex bg-customPurple items-center gap-2 px-4 rounded-[5px]'>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="h-full grow bg-transparent outline-none text-[0.8rem] hide-spin-buttons"
        placeholder={placeholder}
        required={required}
        min={min}
        max={max}
        pattern={pattern}
      />
      {icon}
    </div>
  </div>
);

const Page = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    companyName: '',
    email: '',
    password: ''
  });
  const [status, setStatus] = useState<{color:string,message:string}|null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [inRequest,setInrequest]=useState<boolean>(false);

  const router = useRouter();

  const handleInputChange = (field: string) => (event: ChangeEvent<HTMLInputElement>) => {
    setStatus(null)
    let value = event.target.value;
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(inRequest)
      return;
    setInrequest(true)
    try {
        await axios.post('/api/requestAccess', formData);
        setStatus({color:"text-green-600",message:"Request Submitted will mail you once Verified"});
        setInrequest(false)
    } catch (err) {
      setStatus({color:"text-red-600",message:"There was an Error please try again"});
      setInrequest(false)
    }
};


  return (
    <div className='flex flex-col h-full gap-2.5 text-[rgb(255,255,255,0.6)]'>
      <h1 className='text-[2rem] gradient-text font-bold'>Request</h1>
      <p className='text-[0.82rem]'>
        Looks like someone&#39;s manager just dropped a hefty Excel sheet in their lap... Time to request access and get started! Welcome aboard!
      </p>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-full mt-5'>
        <InputField
          type="text"
          value={formData.name}
          onChange={handleInputChange('name')}
          placeholder="Enter Name"
          required
        />
        <InputField
          type="number"
          value={formData.age}
          onChange={handleInputChange('age')}
          placeholder="Enter Age (18-80)"
          required
          min="18"
          max="80"
          pattern="\d+"
        />
        <InputField
          type="text"
          value={formData.companyName}
          onChange={handleInputChange('companyName')}
          placeholder="Enter Company Name"
          required
        />
        <InputField
          type="email"
          value={formData.email}
          onChange={handleInputChange('email')}
          placeholder="Enter Email"
          required
          icon={<MdMailOutline className='text-2xl' />}
        />
        <InputField
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={handleInputChange('password')}
          placeholder="Enter Password"
          required
          icon={showPassword ?
            <AiOutlineEye onClick={() => setShowPassword(false)} className='text-2xl' /> :
            <AiOutlineEyeInvisible onClick={() => setShowPassword(true)} className='text-2xl' />
          }
        />
        {status && <div className={`${status.color} text-[0.8rem]`}>{status.message}</div>}
        <div className='gradient-border h-[3.8rem]'>
          <button type='submit' className='h-full w-full bg-black rounded-[5px]'>
            <span className='gradient-text font-bold'>{inRequest?"Requesting.....":"Request 🡪"}</span>
          </button>
        </div>
      </form>
      <div className='flex gap-1 justify-center text-[0.75rem]'>
        <div>Join Our Waitlist Now!</div>
        <button onClick={() => router.push("/Authentication")} className='gradient-text-animate font-bold'>Log In</button>
      </div>
    </div>
  );
};

export default Page;