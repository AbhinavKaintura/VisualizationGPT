import Markdown from "react-markdown"
interface TextBoxProps {
    text: string | boolean
}

const TextBox: React.FC<TextBoxProps> = ({ text }) => {
    return (
        <div className="whitespace-pre-wrap ">
        {text}
        </div>
    )
}

export default TextBox;