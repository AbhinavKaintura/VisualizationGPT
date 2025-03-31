// import React, { useMemo } from 'react';
// import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { DataPoint, generateDistinctColors, scaleToKM } from "@/app/ChatPage/AIMessage/types";

// const DynamicRegressionChart: React.FC<{ data: DataPoint[] }> = ({ data }) => {
//     if (data.length === 0) return null;

//     const xAxisKey = "time";
//     const actualKey = "actual";
//     const predictedKey = "predicted";
    
//     const lineColors = useMemo(() => generateDistinctColors(2), []);

//     return (
//         <ResponsiveContainer width="100%" height="100%">
//             <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 10 }}>
//                 <XAxis dataKey={xAxisKey} stroke='white' label={{
//                         value: `${xAxisKey}`,
//                         position: 'insideBottom',
//                         fill: 'gray',
//                         fontSize: 15,
//                         dy: 10,
//                         dx: -10
//                     }} />
//                 <YAxis stroke='white' tickFormatter={(value) => scaleToKM(value)} />
//                 <Tooltip
//                     labelClassName='text-white'
//                     formatter={(value: number) => scaleToKM(value)}
//                     contentStyle={{ backgroundColor: '#1f1f21', boxShadow: 'initial', border: 'none', color: 'white', borderRadius: '5px' }}
//                     cursor={{ stroke: '#18191b', strokeWidth: 2 }}
//                 />
//                 <Legend verticalAlign="top" align="center" wrapperStyle={{ paddingBottom: 10 }} />
                
//                 {/* Actual Line */}
//                 <Line
//                     type="monotone"
//                     dataKey={actualKey}
//                     stroke={lineColors[0]}
//                     strokeWidth={2}
//                     activeDot={{ r: 6 }}
//                     animationDuration={2000}
//                     animationEasing='linear'
//                 />

//                 {/* Predicted Line (Dashed) */}
//                 <Line
//                     type="monotone"
//                     dataKey={predictedKey}
//                     stroke={lineColors[1]}
//                     strokeWidth={2}
//                     strokeDasharray="5 5"
//                     activeDot={{ r: 4 }}
//                     animationDuration={2000}
//                     animationEasing='linear'
//                 />
//             </LineChart>
//         </ResponsiveContainer>
//     );
// };

// export default DynamicRegressionChart;



import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DataPoint, generateDistinctColors, scaleToKM } from "@/app/ChatPage/AIMessage/types";

const DynamicRegressionChart: React.FC<{ data: DataPoint[] }> = ({ data }) => {
    if (data.length === 0) return null;

    const xAxisKey = "time";
    const actualKey = "actual";
    const predictedKey = "predicted";
    
    const lineColors = useMemo(() => generateDistinctColors(2), []);

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 10 }}>
                <XAxis dataKey={xAxisKey} stroke='white' label={{
                        value: `${xAxisKey}`,
                        position: 'insideBottom',
                        fill: 'gray',
                        fontSize: 15,
                        dy: 10,
                        dx: -10
                    }} />
                <YAxis stroke='white' tickFormatter={(value) => scaleToKM(value)} />
                <Tooltip
                    labelClassName='text-white'
                    formatter={(value: number) => scaleToKM(value)}
                    contentStyle={{ backgroundColor: '#1f1f21', boxShadow: 'initial', border: 'none', color: 'white', borderRadius: '5px' }}
                    cursor={{ stroke: '#18191b', strokeWidth: 2 }}
                />
                <Legend verticalAlign="top" align="center" wrapperStyle={{ paddingBottom: 10 }} />
                
                {/* Actual Line - Removed dot prop */}
                <Line
                    type="monotone"
                    dataKey={actualKey}
                    stroke={lineColors[0]}
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 1 }}
                    animationDuration={1500}
                    animationEasing='linear'
                />

                {/* Predicted Line (Dashed) - Removed dot prop */}
                <Line
                    type="step"
                    dataKey={predictedKey}
                    stroke={lineColors[1]}
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                    activeDot={{ r: 1 }}
                    animationDuration={1500}
                    animationEasing='linear'
                />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default DynamicRegressionChart;