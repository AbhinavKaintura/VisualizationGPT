import React, { useEffect, useState, useRef, useCallback,JSX } from "react";
import { RiDownloadLine } from "react-icons/ri";


interface TableProps {
  data_points: object[];
  name: string;
  key_value: number;
  text:string|boolean;
}

interface TupleProps {
  value: string | number;
}

interface RowProps {
  fullRow: object;
}

const Table: React.FC<TableProps> = ({ data_points, name, key_value,text }) => {
  const [tableElements, setTableElements] = useState<JSX.Element[]>([]);

  const headers = data_points.length > 0 ? Object.keys(data_points[0]) : [];

  const Tuple: React.FC<TupleProps> = ({ value }) => (
    <div className="md:w-[100px] w-[75px] bg-[#000733] whitespace-nowrap py-1 px-2 border border-white border-opacity-40 overflow-x-auto select-none no-scrollbar">{value}</div>
  );

  const Row: React.FC<RowProps> = useCallback(({ fullRow }) => (
    <div className="flex w-fit">
      {Object.values(fullRow).map((col, index) => (
        <Tuple key={index} value={col} />
      ))}
    </div>
  ),[]);

  useEffect(() => {
    const elements = data_points.map((row, index) => <Row key={index} fullRow={row} />);
    setTableElements(elements);
  }, [data_points,Row]);


  const handledownload = () => {
    const fileUrl = `${process.env.NEXT_PUBLIC_pythonApi}/downloadCsv?fileName=${name}`;
    window.location.href = fileUrl; // Directly redirect to the file URL to download
  };

  return (
  
      <div className="flex flex-col gap-1 max-w-full w-fit">
        <div className="flex gap-2 justify-end pr-2 text-[13px] items-center text-[#0051ff]"
        >
          <button className="flex items-center gap-1" onClick={handledownload}>
          <RiDownloadLine  className="text-[19px]" />Download
          </button>
        </div>
        <div id={name + key_value} className="flex flex-col overflow-x-auto">
          <div className="flex w-fit ">
            {headers.map((header, index) => (
              <div key={index} className="overflow-x-auto no-scrollbar md:w-[100px] py-1 pl-2 pr-1 w-[75px] bg-[#001366] border border-white border-opacity-40 ">{header}</div>
            ))}
          </div>
          <div className="flex flex-col overflow-y-auto w-fit max-h-[300px] h-fit">
            {tableElements}
          </div>
        </div>
      </div>

  );
};

export default Table;


