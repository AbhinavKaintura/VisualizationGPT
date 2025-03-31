"use client";
import { RiSendPlaneFill, RiStopLargeFill } from "react-icons/ri";
import { ChangeEvent, useState } from "react";

interface InputBoxProps {
    addUserMessage: Function;
    isDisabled: boolean,
    stopGeneration: Function
}

const InputBox: React.FC<InputBoxProps> = ({ addUserMessage, isDisabled, stopGeneration }) => {
    const [inputValue, setInputValue] = useState<string>("");
    const [isInputEmpty, setIsInputEmpty] = useState<boolean>(true);

    const changeInput = async (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setInputValue(newValue);
        setIsInputEmpty(newValue.trim() === "");
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (inputValue.trim() && !isDisabled) {
            addUserMessage(inputValue);
            setInputValue("");
            setIsInputEmpty(true);
        }
    };

    const handleStop = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        stopGeneration();
    };

    return (
        <form onSubmit={handleSubmit} className="flex grow bg-blue-200 items-center md:px-4 px-2">
            <input required type="text" onChange={changeInput} value={inputValue} className="grow bg-transparent outline-none text-xs rounded-[5px] px-1" placeholder="Type here..." />
            {isDisabled ? <button type="button" onClick={handleStop}><RiStopLargeFill className="text-xl text-blue-800" /></button> :
                <button type="submit"><RiSendPlaneFill className={`${!isInputEmpty ? "text-blue-800" : null} text-xl`} /></button>}
        </form>
    );
};

export default InputBox;
