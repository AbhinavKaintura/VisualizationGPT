import Thinking from '@/components/Threedots';
import React, { ReactNode } from 'react';
import './index.css'

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <main className='flex min-h-screen bg-[#0D0019]'>
        <div className='login hidden md:block p-[5%] min-w-[30%] w-full'>
            <Thinking />
            <div className="mb-8">
                <h1 className="text-[32px] text-white font-medium mb-2">Insights AI</h1>
                <div className="text-[16px] font-semibold text-gray-400">
                    Tired from analyzing extensive Excel spreadsheets? Don&#39;t worry! With Insights AI, have <span className="text-white">data at fly!</span> 
                </div>
            </div>
        </div>
        <div className='loginBack md:w-[800px] flex items-center justify-center w-full'>
            <div className='w-[80%] ' >
                {children}
            </div>
        </div>
    </main>
    );
};

export default Layout;