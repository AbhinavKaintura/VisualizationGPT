"use client";
import Logout from '@/components/Logout';
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im'

const Page = () => {
    const [checkbox, setCheckbox] = useState<boolean>(false);
    const route = useRouter()
    const handleCheckBox = () => {
        setCheckbox(!checkbox)
        setTimeout(() => {
            route.replace('/UploadPage')
        }, 300);
    }

    return (
        <main className='MovingBG text-white h-screen bg-[#0D0019] flex justify-center w-full pt-20 px-10' >
            <Logout />
            <div className='bg-[#190033] flex flex-col gap-8 border border-[#495381] rounded-lg px-4 py-4 h-fit md:w-[475px]'>
                <div className='flex flex-col gap-4'>
                    <h1 className='font-semibold text-base'>Disclaimer</h1>
                    <div className='text-xs opacity-80'>
                    Vision the Visualizer is in its early development phase, and some features may still be refined. Your feedback is valuable in improving the experience while ensuring your data remains protected and confidential.                    </div>
                    <div className='text-xs opacity-80'>
                    By agreeing to this disclaimer, you acknowledge that all your uploaded data, prompts, responses, and feedback remain private and secure within Vision the Visualizer by Team The Endurance. We do not share your data with any open-source services or third-party tools.                    </div>
                </div>
                <div onClick={handleCheckBox} className='flex gap-2 hover:cursor-pointer'>
                    {
                        checkbox ? <ImCheckboxChecked className='text-[#00C337]' /> : <ImCheckboxUnchecked className='opacity-60' />
                    }
                    <div className={`${checkbox ? "gradient-text-animate" : null} text-xs opacity-80`} >I Agree to the T&C and Privacy Policy of Vision the Visualizer</div>
                </div>
            </div>
        </main>
    )
}

export default Page