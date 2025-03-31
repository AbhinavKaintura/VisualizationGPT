import { useState } from "react";

interface NumberFilterProps {
  numberFilterType: string;
  numberFilterValue: string[];
  handleNumberFilter: (type: string, value: string[]) => void;
  pinTable: boolean;
  valuesType: string; // Add valuesType to determine if filter is for number or string
}

const NumberFilter: React.FC<NumberFilterProps> = ({
  numberFilterType,
  numberFilterValue,
  handleNumberFilter,
  pinTable,
  valuesType, // Receiving valuesType as a prop
}) => {
  const [showPopupFor, setShowPopupFor] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [betweenValue, setBetweenValue] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
  
    // Restrict input to 30 characters
    if (inputValue.length > 30) {
      return;
    }
  
    // Only check for number input if the valuesType is "number"
    if (valuesType === "number") {
      if (/^\d*\.?\d*$/.test(inputValue)) {
        setValue(inputValue);
      }
    } else {
      setValue(inputValue); // For strings, directly set the value
    }
  };
  
  const handleChangeBetween = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
  
    // Restrict input to 30 characters
    if (inputValue.length > 30) {
      return;
    }
  
    if (valuesType === "number") {
      if (/^\d*\.?\d*$/.test(inputValue)) {
        setBetweenValue(inputValue);
      }
    } else {
      setBetweenValue(inputValue); // For strings, directly set the value
    }
  };
  
  // Define filter options for number and string
  const NumberTypes = [
    "Equals",
    "Does Not Equals",
    "Greater Than",
    "Greater Than Or Equal to",
    "Less Than",
    "Less Than Or Equal to",
    "Between",
    "Top",
    "Above Average",
    "Below Average",
  ];

  const TextTypes = [
    "Equals",
    "Does Not Equals",
    "Begins With",
    "Ends With",
    "Contains",
    "Does Not Contain",
  ];

  // Conditionally render based on valuesType
  const currentFilterTypes = valuesType === "number" ? NumberTypes : TextTypes;

  return (
    <div
      className={`overflow-y-auto text-gray-200 px-1 flex flex-col gap-0.5  ${
        pinTable ? "max-h-[50vh]" : "max-h-[16vh] md:max-h-[20vh]"
      }`}
    >
      {currentFilterTypes.map((filter, index) => (
        <div key={index}>
          <div
            onClick={() => {
              if (filter === "Above Average" || filter === "Below Average") {
                handleNumberFilter(filter, []);
                setShowPopupFor("");
              } else {
                setShowPopupFor(filter);
              }
            }}
            className={`${
              numberFilterType === filter && "bg-[#190033]"
            } whitespace-nowrap text-[11px] px-2`}
          >
            {numberFilterType === filter
              ? numberFilterType === "Between"
                ? <div>{filter} <b> {numberFilterValue[0] + "-" + numberFilterValue[1]}</b></div> 
                : numberFilterType === "Above Average" ||
                  numberFilterType === "Below Average"
                ? <b>{filter}</b>
                :<div>{filter} <b>{numberFilterValue[0]}</b></div> 
              : filter}
          </div>
          {showPopupFor === filter && (
            <form
              className="flex gap-2 mx-1"
              onSubmit={(e) => {
                e.preventDefault();
                if (filter === "Between") {
                  handleNumberFilter(filter, [value, betweenValue]);
                } else {
                  handleNumberFilter(filter, [value]);
                }
                setShowPopupFor("");
                setValue("");
                setBetweenValue("");
              }}
            >
              <input
                required
                type="text"
                value={value}
                onChange={handleChange}
                className="rounded-[4px] text-[10px] px-1.5 py-[0.2px] bg-[#190033] outline-none w-full"
                placeholder={valuesType === "number" ? "Enter number" : "Enter text"} // Dynamic placeholder
              />

              {filter === "Between" && (
                <input
                  required
                  type="text"
                  value={betweenValue}
                  onChange={handleChangeBetween}
                  className="rounded-[4px] text-[10px] px-1.5 py-[0.2px] bg-[#190033] outline-none w-full"
                  placeholder={valuesType === "number" ? "Enter number" : "Enter text"} // Dynamic placeholder
                />
              )}
              <button
                type="submit"
                className="bg-[#190033] text-[10px] px-2 py-1 rounded-[4px] hidden"
              >
                Submit
              </button>
            </form>
          )}
        </div>
      ))}
    </div>
  );
};

export default NumberFilter;
