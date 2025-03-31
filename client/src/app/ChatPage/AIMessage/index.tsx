import StaticThinking from "@/app/ChatPage/AIMessage/StaticThreeDots/index"
import { useState } from "react";
import { BiDislike, BiLike, BiSolidDislike, BiSolidLike } from "react-icons/bi";
import { VscDebugRestart } from "react-icons/vsc";
import TextBox from "@/app/ChatPage/AIMessage/TextBox/index";
import { AIDataProp, DataProps } from "@/app/ChatPage/AIMessage/types";
import Visuals from "@/app/ChatPage/AIMessage/Visuals/index";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Thinking from "@/components/Threedots/index";

const AiMessage: React.FC<AIDataProp> = ({ data, getAiResponse, userText }) => {
    const [dataAarray, setDataArray] = useState<DataProps[]>([data])
    const [onScreenData, setOnScreenData] = useState<number>(0)
    const { AIresponse, visuals } = dataAarray[onScreenData]
    const [feedbackUp, setFeedbackUp] = useState<boolean>(false)
    const [feedbackDown, setFeedbackDown] = useState<boolean>(false)
    const isVisualsArray = Array.isArray(visuals);
    const isGraphPresent:boolean = isVisualsArray && visuals.some(({ type }) => type !== "table");
    const [inInternalRequest, setInInternalRequest] = useState<boolean>(false)
    const reGenerateResponse = async () => {
        setInInternalRequest(true)
        const res = await getAiResponse(userText);
        if (res.status === "Success") {
            setDataArray(prevEl => [...prevEl, res.resData])
            setOnScreenData(dataAarray.length)
        }
        else if (res.status === "AbortError" || res.status === "Error") {
            console.log(res)
            setDataArray(prevEl => [...prevEl, res.resData])
            setOnScreenData(dataAarray.length)
        }
        setInInternalRequest(false)
    }
    return (
        <>
            {inInternalRequest ?
                <div className="pl-2 pb-3"><Thinking /></div> :
                <div className={`lg:max-w-[60%] md:max-w-[80%] max-w-[95%] w-fit ${isGraphPresent&&"lg:min-w-[60%] md:min-w-[80%] min-w-[95%]"} flex flex-col`}>
                    <div className="pl-2">
                        <StaticThinking />
                    </div>
                    <div className={` flex flex-col  gap-2 w-full ${isVisualsArray ? "bg-black" : " bg-[#247486]"} border border-white border-opacity-60 rounded-md select-text p-3`}>
                        {AIresponse &&
                            <TextBox text={AIresponse} />}

                        {isVisualsArray &&
                            visuals.map(({ text, type, data_points, name }, index) => (
                                <Visuals key={index} key_value={index} text={text} type={type} data_points={data_points} name={name} />
                            ))
                        }
                    </div>
                    <div className={`flex justify-end items-center text-xl opacity-60 gap-2 ${dataAarray.length > 1 ? "mt-0.5" : "mt-1.5"}`}>
                        {dataAarray.length > 1 &&
                            <div className="flex flex-row items-center ">
                                <IoIosArrowBack className={`${onScreenData >= 1 ? "cursor-pointer":"text-gray-400 text-opacity-50" }`} onClick={onScreenData >= 1 ? () => setOnScreenData(onScreenData - 1) : () => { }} />
                                <div className="text-[15px] mt-0.5">{onScreenData + 1}{" "}<span className="inline-block text-[13px] rotate-12">/</span>{" "}{dataAarray.length}
                                </div>
                                <IoIosArrowForward className={`${onScreenData == dataAarray.length - 1 ? "text-gray-400 text-opacity-50":"cursor-pointer" }`} onClick={onScreenData !== dataAarray.length - 1 ? () => setOnScreenData(onScreenData + 1) : () => {}} />
                            </div>
                        }
                        <VscDebugRestart className="hover:cursor-pointer" onClick={reGenerateResponse} />
                        {
                            feedbackDown ? <BiSolidDislike /> : <BiDislike className="hover:cursor-pointer" onClick={() => (setFeedbackDown(true), setFeedbackUp(false))} />
                        }
                        {
                            feedbackUp ? <BiSolidLike /> : <BiLike className="hover:cursor-pointer" onClick={() => (setFeedbackUp(true), setFeedbackDown(false))} />
                        }
                    </div>
                </div>
            }
        </>
    );
}

export default AiMessage