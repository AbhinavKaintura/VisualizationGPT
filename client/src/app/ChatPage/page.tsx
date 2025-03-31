//chatpage/page.tsx

"use client";
import Thinking from "@/components/Threedots/index";
import UserMessage from "@/app/ChatPage/UserMessage/index";
import InputBox from "@/app/ChatPage/InputBox/index";
import AiMessage from "@/app/ChatPage/AIMessage/index";
import { useCallback, useEffect, useRef, useState, JSX } from "react";
import Table from "@/app/ChatPage/Table/index";
import { RxCross2 } from "react-icons/rx";
import { RiFileExcel2Line } from "react-icons/ri";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from 'react'
import axios from "axios";
import { getCookie } from "cookies-next";
export type FilterType = {
    name: string;
    filter: {
        basic: string;
        filterOn: string[];
        filterType: string
        filterValue: string[]
    };
};
interface uniqueValueProps {
    columnName: string;
    allUniques: string[] | number[] | Date[];
}
interface CsvData {
    [key: string]: (string | number)
  }
  
const ChatPage = () => {
    const [elements, setElements] = useState<JSX.Element[]>([]);
    const route = useRouter();
    const searchParams = useSearchParams();
    const fileName = searchParams?.get('fileName') ?? "";
    const [pinTable, setPinTable] = useState<boolean>(false);
    const [csvData, setCsvData] = useState<CsvData[]>([]);
    const [uniqueValues, setUniqueValues] = useState<uniqueValueProps[]>([]);
    const [Filters, setFilters] = useState<FilterType[]>([]);
    const [inRequest, setInRequest] = useState<boolean>(false);
    const [isThinking, setIsThinking] = useState<boolean>(false);
    const [csvRowNumber, setCsvRowNumber] = useState<number>(1);
    const [lengthOfFilteredData, setLengthOfFilteredData] = useState<number>(300)
    const abortControllerRef = useRef<AbortController | null>(null);
    const [userName,setuserName]=useState<string>("");

    useEffect(() => {
        const userName=getCookie('userName')||"";
        setuserName(userName);
    },[])

    const pinTableFunc = () => {
        setPinTable(!pinTable)
    }
    const bottomOfChat = useRef<HTMLDivElement>(null);
    // function to scroll to bottomfeedbackid
    const scrollToBottom: () => void = () => {
        bottomOfChat.current?.scrollIntoView({ behavior: "smooth" });
    };

    const getAiResponse = async (userPrompt: string) => {
        setInRequest(true);
        abortControllerRef.current = new AbortController();
    
        try {
            const res = await fetch(process.env.NEXT_PUBLIC_pythonApi + 'query', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: userPrompt,fileName,userName }),
                signal: abortControllerRef.current.signal,
            });
    
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
    
            const resData = await res.json();
            console.log(resData);
            return { status: "Success", resData };
        } catch (error: unknown) {
            if (error instanceof Error) {
                if (error.name === 'AbortError') {
                    console.log('Request was aborted');
                    return { status: "AbortError", resData:{AIresponse:"Request was aborted",visuals:false }};
                } else {
                    console.error('Error:', error.message);
                    return { status: "Error", resData:{AIresponse: "An error occurred",visuals:false} };
                }
            } else {
                console.error('An unknown error occurred');
                return { status: "Error", resData:{AIresponse: "An unknown error occurred",visuals:false }};
            }
        } finally {
            setInRequest(false);
            abortControllerRef.current = null;
        }
    };

    const addUserMessage = async (userPrompt: string) => {
        // Add the user's message to the chat
        setElements((prevElements) => [
            ...prevElements,
            <UserMessage key={`user-${prevElements.length}`} text={userPrompt} />,
        ]);
        setIsThinking(true)
        scrollToBottom();
        const res = await getAiResponse(userPrompt);
        setIsThinking(false);

        if (res.status === "Success") {
            console.log(res.resData);
            setElements((prevElements) => [
                ...prevElements,
                <AiMessage key={`ai-${prevElements.length}`} data={res.resData} getAiResponse={getAiResponse} userText={userPrompt} />,
            ]);
        } else if (res.status === "AbortError" || res.status === "Error") {
            setElements((prevElements) => [
                ...prevElements,
                <AiMessage key={`ai-${prevElements.length}`} data={res.resData} getAiResponse={getAiResponse} userText={userPrompt} />,
            ]);
        }
        scrollToBottom();
    };

    

    const stopGeneration = () => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
            setInRequest(false);
        }
    };

    const UpdateFilters = async (Filter: FilterType[]) => {
        setFilters(Filter)
        setCsvRowNumber(1)
    }

    const fetchCSV = useCallback(async () => {
        try {
            const response = await axios.post(
                process.env.NEXT_PUBLIC_pythonApi + "fetchCsv",
                {
                    fileName: fileName,
                    filters: Filters,
                    csvRowNumber: csvRowNumber
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );
            setCsvData(response.data.csvdata);
            setUniqueValues(response.data.uniqueValues);
            setLengthOfFilteredData(response.data.length);
        } catch (error: any) {
            console.error(error.response ? error.response.data : error.message);
        }
    }, [fileName, Filters, csvRowNumber]);

    useEffect(() => {
        fetchCSV();
    }, [fetchCSV, Filters, csvRowNumber]);

    return (
        <div className="flex">
            {/* <Logout pinTable={pinTable} /> */}
            <div className={`ChatBG text-white h-[100vh] flex flex-col justify-between ${pinTable ?" w-[55%]":"w-full md:px-12"} gap-1 px-5 pb-3 pt-5 `}>
                <div className="flex flex-col gap-3 overflow-y-auto text-xs h-[93%] no-scrollbar">
                    {!pinTable && <Table  pinTableFunc={pinTableFunc} pintable={pinTable} data={csvData} UpdateFilters={UpdateFilters} Filters={Filters} uniqueValues={uniqueValues} removeAllFilters={setFilters} csvRowNumber={csvRowNumber} setCsvRowNumber={setCsvRowNumber} lengthOfFilteredData={lengthOfFilteredData} />}
                    {elements}
                    <div className="pl-2">
                        {isThinking && <Thinking />}
                    </div>
                    <div className="md:mb-[7%] mb-20" ref={bottomOfChat}></div>
                </div>
                {/* Input box fixed below */}
                <div className='fixed bottom-2 left-3 right-3 md:static md:bottom-auto md:left-auto md:right-auto gradient-border h-[7%] text-white text-opacity-70' >
                    <div className="h-full flex justify-between overflow-hidden rounded-[5px]">
                        <InputBox addUserMessage={addUserMessage} isDisabled={inRequest} stopGeneration={stopGeneration} />
                        {
                            !pinTable && <div className="flex md:gap-24 md:px-[17px] px-[3px] bg-[#247486]">
                                <div className="flex items-center gap-1 md:text-sm text-[9.5px] hover:cursor-pointer" onClick={() => location.href = "#table"}>
                                    <RiFileExcel2Line className="md:text-xl text-sm" />
                                    {fileName}
                                </div>
                                <button onClick={() => route.replace("/UploadPage")}><RxCross2 className="flex items-center md:text-xl text-sm" /></button>
                            </div>
                        }
                    </div>
                </div>
            </div>
            {pinTable &&
                <div className="flex flex-col justify-between max-w-[45%] max-h-[100vh] gap-1 bg-[#124652] px-3 py-3 text-xs" >
                    <Table pinTableFunc={pinTableFunc} pintable={pinTable}  data={csvData} UpdateFilters={UpdateFilters} Filters={Filters} uniqueValues={uniqueValues} removeAllFilters={setFilters} csvRowNumber={csvRowNumber} setCsvRowNumber={setCsvRowNumber} lengthOfFilteredData={lengthOfFilteredData} />
                    <div className='gradient-border h-[7%] text-white text-opacity-70' >
                        <div className="flex bg-[#247486] h-full justify-between overflow-hidden rounded-[5px] px-3">
                            <div className="flex items-center gap-1 md:text-sm text-[9.5px] hover:cursor-pointer">
                                <RiFileExcel2Line className="md:text-xl text-sm" />
                                <div className=" text-white text-opacity-80">
                                    {fileName ? fileName : "FileName.XLS"}
                                </div>
                            </div>
                            <button onClick={() => route.replace("/UploadPage")}><RxCross2 className="flex items-center md:text-xl text-sm" /></button>
                        </div>
                    </div>
                </div>}
        </div >
    );
}



export default function Page() {
    return (
        <Suspense>
            <ChatPage />
        </Suspense>
    )
}