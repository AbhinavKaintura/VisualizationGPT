import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DataPoint, generateDistinctColors, scaleToKM } from "@/app/ChatPage/AIMessage/types";

const DynamicForecastChart: React.FC<{ data: DataPoint[] }> = ({ data }) => {
    if (data.length === 0) return null;

    const xAxisKey = "timestamp";
    const actualKey = "actual";
    const forecastKeys = ["forecast", "lower_bound", "upper_bound"];
    
    const lineColors = useMemo(() => generateDistinctColors(forecastKeys.length + 1), [forecastKeys.length]);

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
                
                {/* Actual Line */}
                <Line
                    type="monotone"
                    dataKey={actualKey}
                    stroke={lineColors[0]}
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6 }}
                    animationDuration={2000}
                    animationEasing='linear'
                />

                {/* Forecast Lines */}
                {forecastKeys.map((key, index) => (
                    <Line
                        key={index}
                        type="monotone"
                        dataKey={key}
                        stroke={lineColors[index + 1]}
                        strokeWidth={2}
                        dot={false}
                        strokeDasharray={key === "forecast" ? "3 3" : "5 5"}
                        activeDot={{ r: 4 }}
                        animationDuration={2000}
                        animationEasing='linear'
                    />
                ))}
            </LineChart>
        </ResponsiveContainer>
    );
};

export default DynamicForecastChart;
