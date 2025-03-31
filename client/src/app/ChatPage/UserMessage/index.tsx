import { CgProfile } from "react-icons/cg";

interface UserTextProp {
    text: string
}

const userMessage: React.FC<UserTextProp> = ({ text }) => {
    return (
        <div className="flex justify-end">
            <div className="w-[60%] flex justify-end">
                <div className="flex flex-col">
                    <span className="opacity-60 self-end pb-1"><CgProfile className="text-xl text-cyan-800" /></span>
                    <div className="bg-[#247486] border border-white border-opacity-60 rounded-lg px-4 py-3 w-fit break-all select-text">
                        {text}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default userMessage