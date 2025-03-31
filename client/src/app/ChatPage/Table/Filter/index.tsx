import { FilterType } from "@/app/ChatPage/page";
import { useState } from "react";
import _ from 'lodash';
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { IoMdRadioButtonOff, IoMdRadioButtonOn } from "react-icons/io";
import NumberFilter from "@/app/ChatPage/Table/Filter/NTFilter/index";

interface FilterButtonProps {
  headerName: string;
  UniqueValues: string[] | number[] | Date[];
  pinTable: boolean;
  Filter: FilterType;
  UpdateFilter: (UpdateFilter: FilterType, value: string) => void;
  CloseFilter: (emptystring: "") => void;
  EmptyFilter:(value:string)=>FilterType;
}

const Index: React.FC<FilterButtonProps> = ({ headerName, UniqueValues, pinTable, Filter, UpdateFilter, CloseFilter,EmptyFilter }) => {
  // Initialize with only the name, other properties as undefined
  const [SelectedFilter, setSelectedFilter] = useState<FilterType>(Filter);
  const [showSelect, setShowSelect] = useState<boolean>(Filter.filter.filterType === "");
  const handleRadioChange = (newBasic: string) => {
    const updatedBasic = SelectedFilter.filter.basic === newBasic ? "" : newBasic;

    const updatedFilter: FilterType = {
      ...SelectedFilter,
      filter: {
        ...SelectedFilter.filter,
        basic: updatedBasic,
      },
    };

    setSelectedFilter(updatedFilter);
  };

  const handleCheckboxChange = (value: string) => {
    const updatedFilterOn = SelectedFilter.filter.filterOn.includes(value)
      ? SelectedFilter.filter.filterOn.filter(item => item !== value)
      : [...SelectedFilter.filter.filterOn, value];

    const updatedFilter: FilterType = {
      ...SelectedFilter,
      filter: {
        ...SelectedFilter.filter,
        filterOn: updatedFilterOn,
        filterType: "",
        filterValue: []
      },
    };

    setSelectedFilter(updatedFilter);
  };

  const handleNumberFilter = (filterNumberType: string, filterNumberValue: string[]) => {
    const updatedFilter: FilterType = {
      name: SelectedFilter.name,
      filter: {
        basic: SelectedFilter.filter.basic,
        filterOn: [],
        filterType: filterNumberType,
        filterValue: filterNumberValue
      }
    };

    setSelectedFilter(updatedFilter);
  };

  const handleApply = () => {
    UpdateFilter(SelectedFilter, headerName);
  };

  const handleClear = () => {
    setSelectedFilter(EmptyFilter(SelectedFilter.name));
  };


  return (
    <div className="relative overflow-visible right-20">
      <div className="absolute overflow-visible shadow-lg bg-[#000000] p-4 flex flex-col gap-1.5">
        <div className="flex gap-3 items-center whitespace-nowrap">
          Filter for {headerName}
        </div>
        <hr className="opacity-60" />
        <div>
          <div onClick={() => handleRadioChange("Descending to Ascending")} className="flex text-gray-300 gap-2 text-[10.5px] whitespace-nowrap items-center">
            {SelectedFilter.filter.basic === "Descending to Ascending" ? <IoMdRadioButtonOn className="text-green-500 text-[13px]" /> :
              <IoMdRadioButtonOff className="text-[13px]" />}
            Descending - Ascending
          </div>
          <div onClick={() => handleRadioChange("Ascending to Descending")} className="flex text-gray-300 gap-2 whitespace-nowrap text-[10.5px] items-center">
            {SelectedFilter.filter.basic === "Ascending to Descending" ? <IoMdRadioButtonOn className="text-green-500 text-[13px]" /> :
              <IoMdRadioButtonOff className="text-[13px]" />}
            Ascending - Descending
          </div>
        </div>
        <hr className="opacity-60" />
        <div className="flex justify-between">
          <div onClick={() => setShowSelect(true)} className={`${showSelect && "text-blue-700 cursor-default "} cursor-pointer`}>Select</div>
          {<div onClick={() => setShowSelect(false)} className={`${!showSelect && "text-blue-700 cursor-default "} cursor-pointer`} >
            {typeof(UniqueValues[UniqueValues.length-1])=="number"?"Number Filters":"Text Filter"}
            </div>}
        </div>
        {showSelect ?
          <div className={`overflow-y-auto px-1 ${pinTable ? 'max-h-[50vh]' : 'max-h-[16vh] md:max-h-[20vh]'}`}>
            {UniqueValues.map((value, index) => (
              <div key={index} onClick={() => handleCheckboxChange(value as string)} className="flex bg-[#190033] px-2 text-gray-300 items-center gap-2 cursor-pointer whitespace-nowrap">
                {SelectedFilter.filter.filterOn.includes(value as string) ?
                  <MdCheckBox className="text-green-500 text-[13px]" /> :
                  <MdCheckBoxOutlineBlank className="text-[13px]" />}
                {value !== "" ? value as string : "null"}
              </div>
            ))}
          </div>
          :
          <NumberFilter
            numberFilterType={SelectedFilter.filter.filterType}
            numberFilterValue={SelectedFilter.filter.filterValue}
            handleNumberFilter={handleNumberFilter}
            pinTable={pinTable}
            valuesType={typeof(UniqueValues[UniqueValues.length-1])}
          />
        }
        <hr className="opacity-60" />
        <div className="flex justify-between">
          <button
            disabled={_.isEqual(SelectedFilter, Filter)}
            className={`${_.isEqual(SelectedFilter, Filter) && "text-gray-500"}`}
            onClick={handleApply}
          >
            Apply
          </button>
          <button
            disabled={_.isEqual(SelectedFilter, EmptyFilter(SelectedFilter.name))}
            className={`${_.isEqual(SelectedFilter, EmptyFilter(SelectedFilter.name)) && "text-gray-500"}`}
            onClick={handleClear}
          >
            Clear
          </button>
          <button onClick={() => CloseFilter("")}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default Index;