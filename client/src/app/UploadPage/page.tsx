//upload page
// This page allows users to upload a CSV file and shows a progress bar during the upload process.
"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { RiFileExcel2Line, RiUploadLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";

const Page = () => {
    const router = useRouter();
    const [fileName, setFileName] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [progress, setProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [loaderIncreaseTime, setLoaderIncreaseTime] = useState<number>(50);
    const [uploadComplete, setUploadComplete] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout | null = null;

        if (isUploading && progress < 80 && !uploadComplete) {
            timer = setInterval(() => {
                setProgress((prevProgress) => Math.min(prevProgress + 1, 80));
            }, loaderIncreaseTime);
        }

        return () => {
            if (timer) {
                clearInterval(timer);
            }
        };
    }, [isUploading, progress, loaderIncreaseTime, uploadComplete]);

    // Separate effect for navigation after upload completion
    useEffect(() => {
        if (uploadComplete && progress === 100 && fileName) {
            router.push(`/UploadPage/StartChat?fileName=${fileName}`);
        }
    }, [uploadComplete, progress, fileName, router]);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (file.type !== "text/csv") {
            setError("Please select a CSV file");
            return;
        }

        setLoaderIncreaseTime(file.size / 70000);
        setFileName(file.name);
        setIsUploading(true);
        setProgress(0);
        setError(null);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_pythonApi}upload`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            if (response.status === 200) {
                setUploadComplete(true);
                // Complete the progress bar
                const timer = setInterval(() => {
                    setProgress((prevProgress) => {
                        const newProgress = Math.min(prevProgress + 1, 100);
                        if (newProgress === 100) {
                            clearInterval(timer);
                        }
                        return newProgress;
                    });
                }, 15);
            } else {
                throw new Error("Upload failed");
            }
        } catch (error) {
            console.error('Upload failed:', error);
            setError("An error occurred while uploading your file");
            setIsUploading(false);
        }
    };

    return (
        <div>
            {isUploading ? (
                <div className='flex flex-col self-center gap-6'>
                    <div className='flex justify-between'>
                        <div className='flex items-center gap-1'>
                            <RiFileExcel2Line className='text-2xl' />
                            {fileName}
                        </div>
                        <button onClick={() => router.back()}>
                            <RxCross2 className='text-lg' />
                        </button>
                    </div>
                    <div className='flex items-center max-w-[846px] h-[60px] bg-[#000319] border border-[#495d81] rounded-lg'>
                        <div className="flex gap-6 items-center justify-between w-full h-[30%] px-3">
                            <div className='w-full h-full rounded-lg bg-[#00054c]'>
                                <div 
                                    className="w-full h-full gradient-background rounded-lg" 
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                            <div className="text-white">{progress}%</div>
                        </div>
                    </div>
                </div>
            ) : (
                <form>
                    <label htmlFor='dropzone-file' className='md:text-base text-xs hover:cursor-pointer'>
                        <div className='flex md:flex-row gap-2 flex-col justify-center border-2 bg-[#000219] rounded-lg items-center md:h-[20.625rem] md:max-w-[52.875rem] h-[40vh]'>
                            <RiUploadLine className='text-lg' />
                            <div className="opacity-80">
                                Browse your system or drag & drop to upload.
                            </div>
                        </div>
                        <input 
                            type="file" 
                            id="dropzone-file" 
                            accept="text/csv" 
                            className="hidden" 
                            onChange={handleFileChange} 
                        />
                    </label>
                    {error && (
                        <div className="text-red-600">
                            {error}
                        </div>
                    )}
                </form>
            )}
        </div>
    );
};

export default Page;