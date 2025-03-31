// import React, { useMemo } from 'react';
// import { Tooltip, Legend, ResponsiveContainer, Pie, PieChart, Cell } from 'recharts';
// import { DataPoint, generateDistinctColors, scaleToKM } from "@/app/ChatPage/AIMessage/types";

// // Define a custom type for the label props
// interface CustomLabelProps {
//     cx: number;
//     cy: number;
//     midAngle: number;
//     innerRadius: number;
//     outerRadius: number;
//     percent: number;
//     index: number;
// }

// const DynamicPieChart: React.FC<{ data: DataPoint[] }> = ({ data }) => {
//     const firstDataPoint = data[0];
//     const labelKey = Object.keys(firstDataPoint).find(key => typeof firstDataPoint[key] === 'string') as string;
//     const valueKey = firstDataPoint ? Object.keys(firstDataPoint).filter(key => typeof firstDataPoint[key] === 'number') : [];
//     const pieColors = useMemo(() => generateDistinctColors(data.length), [data.length]);

//     if (data.length === 0) return null;

//     // Customized label rendering function
//     const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: CustomLabelProps) => {
//         const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//         const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
//         const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

//         return (
//             <text className='font-bold text'
//                 x={x}
//                 y={y}
//                 fill="black" // Label color
//                 textAnchor={x > cx ? 'start' : 'end'} // Position based on location
//                 dominantBaseline="central" // Center alignment
//             >
//                 {`${(percent * 100).toFixed(0)}%`}
//             </text>
//         );
//     };

//     return (
//         <ResponsiveContainer width="100%" height="100%">
//             <PieChart margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
//                 <Pie
//                     data={data}
//                     dataKey={valueKey[0]}
//                     nameKey={labelKey}
//                     cx="50%"
//                     cy="50%"
//                     outerRadius={valueKey.length === 1 ? '70%' : '50%'}
//                     fill={pieColors[0]}
//                     animationDuration={2000}
//                     animationEasing="ease-out"
//                     labelLine={valueKey.length === 1 ?true:false} 
//                     label={valueKey.length === 1 ? ({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%` : renderCustomizedLabel}
//                 >
//                     {valueKey.length === 1 && data.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={pieColors[index]} />
//                     ))}
//                 </Pie>

//                 {valueKey.length === 2 && (
//                     <Pie
//                         data={data}
//                         dataKey={valueKey[1]}
//                         nameKey={labelKey}
//                         cx="50%"
//                         cy="50%"
//                         outerRadius="80%"
//                         fill={pieColors[1]}
//                         animationDuration={2000}
//                         animationEasing="ease-out"
//                         labelLine={true} // Hide label lines
//                         label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
//                         innerRadius="60%"
//                     />
//                 )}

//                 <Tooltip
//                     labelClassName="text-white"
//                     formatter={(value: number) => scaleToKM(value)}
//                     contentStyle={{ backgroundColor: '#d6dcde', boxShadow: 'initial', border: 'none', color: 'white', borderRadius: '5px' }}
//                 />
//                 <Legend />
//             </PieChart>
//         </ResponsiveContainer>
//     );
// };

// export default DynamicPieChart;



import React, { useMemo } from 'react';
import { Tooltip, Legend, ResponsiveContainer, Pie, PieChart, Cell } from 'recharts';
import { DataPoint, generateDistinctColors, scaleToKM } from "@/app/ChatPage/AIMessage/types";

// Define a custom type for the label props
interface CustomLabelProps {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
    index: number;
}

const DynamicPieChart: React.FC<{ data: DataPoint[] }> = ({ data }) => {
    const firstDataPoint = data[0];
    const labelKey = Object.keys(firstDataPoint).find(key => typeof firstDataPoint[key] === 'string') as string;
    const valueKey = firstDataPoint ? Object.keys(firstDataPoint).filter(key => typeof firstDataPoint[key] === 'number') : [];
    const pieColors = useMemo(() => generateDistinctColors(data.length), [data.length]);

    if (data.length === 0) return null;

    // Customized label rendering function
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: CustomLabelProps) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
        const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

        return (
            <text className='font-bold'
                x={x}
                y={y}
                fill="black" // Label color
                textAnchor={x > cx ? 'start' : 'end'} // Position based on location
                dominantBaseline="central" // Center alignment
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    // Custom tooltip to show all relevant data

    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
                <Pie
                        className='outline-none'
                    data={data}
                    dataKey={valueKey[0]}
                    nameKey={labelKey}
                    cx="50%"
                    cy="50%"
                    outerRadius={valueKey.length === 1 ? '70%' : '50%'}
                    fill={pieColors[0]}
                    animationDuration={2000}
                    animationEasing="ease-out"
                    labelLine={valueKey.length === 1}
                    label={valueKey.length === 1 ? ({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%` : renderCustomizedLabel}
                >
                    {valueKey.length === 1 && data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={pieColors[index]}  />
                    ))}
                    <Tooltip/>
                </Pie>

                {valueKey.length === 2 && (
                    <Pie
                    className='outline-none'
                        data={data}
                        dataKey={valueKey[1]}
                        nameKey={labelKey}
                        cx="50%"
                        cy="50%"
                        outerRadius="80%"
                        fill={pieColors[1]}
                        animationDuration={2000}
                        animationEasing="ease-out"
                        labelLine={true}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        innerRadius="60%"
                    />
                )}

                <Tooltip
                labelFormatter={(value:number)=>scaleToKM(value)}
                    labelClassName="text-white"
                    formatter={(value: number) => scaleToKM(value)}
                    contentStyle={{ backgroundColor: '#d6dcde', boxShadow: 'initial', border: 'none', color: 'white', borderRadius: '5px' }}
                />
                <Legend
                    layout="vertical"
                    align="right"
                    verticalAlign="middle"
                    wrapperStyle={{ paddingLeft: '10px' }}
                />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default DynamicPieChart;
