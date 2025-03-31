import { RiDownloadLine } from "react-icons/ri";
import DynamicAreaChart from "@/app/ChatPage/AIMessage/Visuals/Recharts/AreaChart";
import DynamicBarChart from "@/app/ChatPage/AIMessage/Visuals/Recharts/BarChart";
import DynamicRegrisionChart from "@/app/ChatPage/AIMessage/Visuals/Recharts/Regression";
import DynamicLineChart from "@/app/ChatPage/AIMessage/Visuals/Recharts/LineChart";
import DynamicPieChart from "@/app/ChatPage/AIMessage/Visuals/Recharts/PieChart";
import DynamicForecastChart from "@/app/ChatPage/AIMessage/Visuals/Recharts/ForeCast";
import domtoimage from 'dom-to-image';
import fileDownload from "js-file-download";

// Define the type for data points, depending on the expected structure for each chart

interface RechartsProps {
  type: string;
  data_points: object[];
  name:string;
}

const Recharts: React.FC<RechartsProps> = ({ type, data_points,name }) => {
  const renderGraph = () => {
    switch (type) {
      case 'line':
        return <DynamicLineChart data={data_points} />;
      case 'bar':
        return <DynamicBarChart data={data_points} />;
      case 'area':
        return <DynamicAreaChart data={data_points} />;
      case 'pie':
        return <DynamicPieChart data={data_points} />;
      case 'regression':
        return <DynamicRegrisionChart data={data_points} />;
      case 'forecast':
        return <DynamicForecastChart data={data_points} />;
      default:
        return null;
    }
  };

  const handledownload = () => {
    const node = document.getElementById(name);
    if (node) {
      domtoimage.toBlob(node)
        .then(blob => {
          if (blob) {
            // Get current date and time
            const fileName = `${type}_graph_${name}.png`;

            fileDownload(blob, fileName);
          }
        })
        .catch(error => {
          console.error('Error generating image', error);
        });
    }
  }


  const graph = renderGraph();

  return (
    <>
      {data_points.length > 0 ? (
        graph ? (
          <>
            <div className="flex justify-end">
              <button onClick={handledownload} className="flex gap-2 text-[13px] items-center text-[#0073ff]">
                <RiDownloadLine className="text-[19px]" />Download
              </button>
            </div>
            <div id={`${name}`} className="container flex flex-col-reverse justify-center items-center min-h-[28.125rem]">
              {graph}
            </div>
          </>
        ) : (
          <div className="flex justify-center text-red-500 text-[15px] py-2">
            Unsupported graph
          </div>
        )
      ) : (
        <div className="h-fit bg-blue-400">Generating graph...</div>
      )}
    </>
  );
};

export default Recharts;

