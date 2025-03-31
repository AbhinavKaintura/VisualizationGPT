
import { VisualProps } from "@/app/ChatPage/AIMessage/types"
import GenTable from "@/app/ChatPage/AIMessage/Visuals/GenTable/index";
import Recharts from "@/app/ChatPage/AIMessage/Visuals/Recharts/index";
import TextBox from "@/app/ChatPage/AIMessage/TextBox/index";

const Visuals: React.FC<VisualProps> = ({ text, type, data_points, name, key_value }) => {
    return (
        <div className="w-full flex flex-col">
            {type == "table" ?
                <>
                    {text && <TextBox text={text} />}
                    <GenTable data_points={data_points} name={name} key_value={key_value} text={text} />
                </>
                : <>
                    {text &&
                        <TextBox text={text} />} 
                    <Recharts type={type} data_points={data_points} name={name} />
                </>}

        </div>
    )
}

export default Visuals;