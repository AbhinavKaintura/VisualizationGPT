import React, { useMemo } from 'react';
import { XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, CartesianGrid } from 'recharts';
import { DataPoint, generateDistinctColors, scaleToKM } from "@/app/ChatPage/AIMessage/types";

const DynamicAreaChart: React.FC<{ data: DataPoint[] }> = ({ data }) => {
    const firstDataPoint = data[0];
    const xAxisKey = firstDataPoint ? Object.keys(firstDataPoint).find(key => typeof firstDataPoint[key] === 'string') as string : '';
    const numericKeys = firstDataPoint ? Object.keys(firstDataPoint).filter(key => typeof firstDataPoint[key] === 'number') : [];
    const areaColors = useMemo(() => generateDistinctColors(numericKeys.length), [numericKeys.length]);

    if (data.length === 0) return null;

    return (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 10 }}>
                <defs>
                    {numericKeys.map((key, index) => (
                        <linearGradient key={`gradient-${key}`} id={`color${index}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={areaColors[index]} stopOpacity={0.8} />
                            <stop offset="95%" stopColor={areaColors[index]} stopOpacity={0} />
                        </linearGradient>
                    ))}
                </defs>
                <XAxis dataKey={xAxisKey} stroke='white' label={{
                    value: `${xAxisKey}`,
                    position: 'insideBottom', // Adjust position to 'insideBottom' for lower placement
                    fill: 'gray', // This sets the label color to white
                    fontSize: 15, // Set the desired font size
                    dy: 10, // Adjust vertical position; increase for lower placement
                    dx: -10 // Adjust horizental position; decrese for slight left placement
                }} />
                <YAxis stroke='white' tickFormatter={(value) => scaleToKM(value)} />
                <Tooltip
                    labelClassName='text-white'
                    formatter={(value: number) => scaleToKM(value)}
                    contentStyle={{ backgroundColor: '#1f1f21', boxShadow: 'initial', border: 'none', color: 'white', borderRadius: '5px' }}
                    cursor={{ stroke: '#18191b', strokeWidth: 2 }} // Change cursor color here                    
                />
                
                <Legend
                    layout="horizontal" // Layout of the legend
                    verticalAlign="top" // Positioning the legend at the top
                    align="center" // Aligning the legend items to the center
                    wrapperStyle={{ paddingBottom: 10 }} // Optional: to add some spacing below the legend
                />
                {numericKeys.map((key, index) => (
                    <Area
                        key={index}
                        type="monotone"
                        dataKey={key}
                        stroke={areaColors[index]}
                        strokeWidth={2}
                        activeDot={{ r: 6 }}
                        fillOpacity={0.9}
                        fill={`url(#color${index})`}
                        animationDuration={2000}
                        animationEasing='linear'
                    />
                ))}
            </AreaChart>
        </ResponsiveContainer>
    );
};

export default DynamicAreaChart;











