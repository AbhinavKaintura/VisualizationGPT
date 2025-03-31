import React, { useEffect, useState, useRef, useMemo, useCallback,JSX } from "react";
import { RiFilterFill, RiFilterLine, RiFilterOffLine, RiPushpinLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import Filter from "@/app/ChatPage/Table/Filter/index";
import _ from 'lodash';
import { FilterType } from "@/app/ChatPage/page"
import { BsArrowDownCircleFill, BsArrowUpCircleFill } from "react-icons/bs";
interface CsvData {
    [key: string]: (string | number)
  }
  
interface TableProps {
    pinTableFunc: () => void;
    pintable: boolean;
    data: CsvData[];
    UpdateFilters: (Filters: FilterType[]) => void;
    Filters: FilterType[];
    uniqueValues: {
        columnName: string;
        allUniques: string[] | number[] | Date[];
    }[];
    removeAllFilters: ([]) => void;
    csvRowNumber:number;
    setCsvRowNumber:(value:number)=>void;
    lengthOfFilteredData:number;
}

interface TupleProps {
    value: string | number;
}

interface RowProps {
    fullRow: object;
    rowNumber:number
}

const Table: React.FC<TableProps> = ({  pinTableFunc, pintable, data, Filters, UpdateFilters, uniqueValues, csvRowNumber,removeAllFilters, setCsvRowNumber,lengthOfFilteredData}) => {
    const [tableElements, setTableElements] = useState<JSX.Element[]>([]);
    const [showFilterFor, setShowFilterFor] = useState<string>();

    const headers = useMemo(() => data.length>0 ? Object.keys(data[0]) : [], [data]);
    const headerRefs = useRef<(HTMLDivElement | null)[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Scroll to the top whenever data changes
        if (scrollRef.current) {
            scrollRef.current.scrollTop = 0;
        }
    }, [data]);
    const Tuple: React.FC<TupleProps> = ({ value }) => (
        <div className="md:w-[105px] w-[80px] bg-[#0f1640] whitespace-nowrap py-1 px-2 border border-white border-opacity-40 overflow-x-auto select-none no-scrollbar">{value}</div>
    );


    const Row: React.FC<RowProps> =useCallback(({ rowNumber,fullRow }) => (
        <div className="flex w-fit">
            <div className="md:w-[50px] w-[45px] bg-[#0f1640] whitespace-nowrap py-1 px-2 border border-white border-opacity-40 overflow-x-auto select-none no-scrollbar">{csvRowNumber+rowNumber}</div>
            {Object.values(fullRow).map((col, index) => (
                <Tuple key={index} value={col} />
            ))}
        </div>
    ),[csvRowNumber]);


    useEffect(() => {
        if (data.length===0) return;
        const elements = data.map((row, index) => <Row key={index} fullRow={row} rowNumber={index}  />);
        setTableElements(elements);
    }, [data,csvRowNumber,Row]);

    const updateFilter = (updateFilter: FilterType, name: string) => {
        // Create a new array without the filter if updateFilter is EmptyFilter
        let updatedFilters = Filters.filter((filter) => filter.name !== name);

        // Check if updateFilter is not equal to EmptyFilter
        const isEmptyFilter = _.isEqual(updateFilter, EmptyFilter(name));

        if (!isEmptyFilter) {
            // If it's not an EmptyFilter, replace the existing filter or add it if it doesn't exist
            const newFilters = Filters.map((filter) =>
                filter.name === name ? updateFilter : filter
            );

            // If the filter doesn't exist in the array, add it
            if (!Filters.some((filter) => filter.name === name)) {
                updatedFilters.push(updateFilter);
            } else {
                updatedFilters = newFilters;
            }
        }

        UpdateFilters(updatedFilters); // Update the filters array in the parent component
        setShowFilterFor("");
    };



    function getUniqueValues(header: string): string[] | number[] | Date[] {
        // Find the corresponding unique values for the given header
        const uniqueValueEntry = uniqueValues.find((entry) => entry.columnName === header);
        return uniqueValueEntry ? uniqueValueEntry.allUniques : [];
    }
    function getSelectedFilter(header: string): FilterType {
        return Filters.find((filter) => filter.name === header) ??
            EmptyFilter(header)
    }
    const EmptyFilter = (hname: string): FilterType => ({
        name: hname,
        filter: {
            basic: "",
            filterOn: [],
            filterType: "",
            filterValue: []
        }
    });


    return (
        <>
            {data.length == 0 && headers.length == 0 ?
                <div className="w-[60%] bg-[#247486] border border-white border-opacity-60 rounded-md p-3">Loading your Data . . .</div>
                :
                <div id="table" className={` ${pintable ? "max-w-full h-[92%]" : "md:max-w-[656px] max-w-full w-fit  bg-[#124652] border border-white border-opacity-60 rounded-md p-3"} select-text relative`}>
                    <div className={`flex ${Filters.length > 0 ? "justify-between" : "justify-end"} gap-1.5 pb-2.5 select-none ${pintable && "h-[5%]"}`}>
                        {Filters.length > 0 && <div onClick={() => { setShowFilterFor(""); removeAllFilters([]); setCsvRowNumber(1) }} className="flex gap-1 text-xs hover:cursor-pointer">
                            <RiFilterOffLine className="text-lg" />
                            Remove Filters
                        </div>}
                        <div className="md:flex hidden" >
                            {pintable ?

                                <button onClick={pinTableFunc}><RxCross2 className="flex items-center md:text-xl text-sm" /></button> :
                                <span className="flex gap-1 hover:cursor-pointer" onClick={pinTableFunc}>
                                    <RiPushpinLine className="text-lg" />
                                    Pin Table Preview
                                </span>

                            }
                        </div>
                    </div>
                    <div className={`flex flex-col  overflow-x-auto ${pintable && "h-[95%]"}`}>
                        <div className="flex w-fit">
                        <div className=" flex grow gap-1.5 items-center justify-between md:w-[50px] w-[45px] bg-[#0f1640] border border-white border-opacity-40 py-1 pl-2 pr-1 ">S.No</div>
                            {headers.map((header, index) => (
                                <div key={index} ref={(el) => { headerRefs.current[index] = el; }} className="flex grow gap-1.5 items-center justify-between md:w-[105px] w-[80px] bg-[#0f1640] border border-white border-opacity-40 py-1 pl-2 pr-1">
                                    <div className="overflow-x-auto no-scrollbar">{header}</div>
                                    <div >
                                        {_.isEqual(getSelectedFilter(header), EmptyFilter(header)) ? <RiFilterLine className="text-lg w-fit hover:cursor-pointer"
                                            onClick={() => {
                                                showFilterFor === header ? setShowFilterFor("") :
                                                    setShowFilterFor(header)
                                            }}
                                        /> :
                                            <RiFilterFill className="text-lg w-fit hover:cursor-pointer"
                                                onClick={() => {
                                                    showFilterFor === header ? setShowFilterFor("") :
                                                        setShowFilterFor(header)
                                                }}
                                            />
                                        }
                                        {showFilterFor === header &&
                                            <Filter
                                                headerName={header}
                                                UniqueValues={getUniqueValues(header)}
                                                pinTable={pintable}
                                                Filter={getSelectedFilter(header)}
                                                UpdateFilter={updateFilter}
                                                CloseFilter={setShowFilterFor}
                                                EmptyFilter={EmptyFilter}
                                            />}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div ref={scrollRef} className={`flex flex-col overflow-y-auto w-fit ${pintable ? "" : "h-[300px]"}`}>
                            {csvRowNumber!==1&&<button className={`absolute text-left text-2xl pl-[180px]  ${pintable ? "md:pl-[353px]" : "md:pl-[300px]"} `} onClick={()=>setCsvRowNumber(csvRowNumber-290-(csvRowNumber<=291?0:10))}><BsArrowUpCircleFill className="opacity-80 hover:opacity-100 text-gray-700 shadow-lg hover:shadow-xl border border-white  rounded-full bg-blue-400 transition-transform transform hover:scale-105"/></button>}
                            {tableElements}
                            {(lengthOfFilteredData>300&&csvRowNumber<lengthOfFilteredData-290)&&<button onClick={()=>setCsvRowNumber(csvRowNumber+290+(csvRowNumber>290?10:0))} className={`absolute text-left text-2xl pl-[180px]  ${pintable ? "md:pl-[353px] bottom-1" : "md:pl-[300px] bottom-4"} `}><BsArrowDownCircleFill className="opacity-80 hover:opacity-100 text-gray-700 shadow-lg hover:shadow-xl border border-white rounded-full bg-blue-400 transition-transform transform hover:scale-105" /></button>}
                        </div>
                    </div>

                </div>
            }
        </>
    );
};

export default Table;