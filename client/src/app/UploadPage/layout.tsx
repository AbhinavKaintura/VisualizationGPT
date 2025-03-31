import Logout from '@/components/Logout';
import React, { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className='MovingBG text-white min-h-screen flex justify-center pt-20 px-3'>
            <Logout  />
            <div className='flex flex-col gap-6'>
                <div className='flex flex-col gap-1'>
                    <h1 className='text-2xl'>Upload Document</h1>
                    <div className='md:text-base text-sm'>
                        Couldn&#39;t dodge your manager this time! Got an Excel sheet to analyze... Let&#39;s tackle it together!
                    </div>
                </div >
                <div>
                    {children}
                </div>
            </div>
        </div >
    );
};

export default Layout;