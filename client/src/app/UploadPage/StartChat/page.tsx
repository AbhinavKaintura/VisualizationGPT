"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState, useEffect, useRef } from "react";
import { RiFileExcel2Line } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  Cell
} from 'recharts';

// Dashboard card component
const DashboardCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
        </div>
        <div className="text-3xl">{icon}</div>
      </div>
    </div>
  );
};

interface DataItem {
  [key: string]: string | number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#8dd1e1'];

const StartChat = () => {
    const route = useRouter();
    const searchParams = useSearchParams();
    const fileName = searchParams?.get('fileName');
    const abortControllerRef = useRef(null);
    
    const [csvData, setCsvData] = useState<DataItem[]>([]);
    const [headers, setHeaders] = useState<string[]>([]);
    const [insights, setInsights] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [inRequest, setInRequest] = useState(false);
    const [barChartData, setBarChartData] = useState<any[]>([]);
    const [userName, setUserName] = useState("user"); // Default username

    useEffect(() => {
        // Fetch the uploaded CSV data
        const fetchData = async () => {
            if (!fileName) return;
            
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_pythonApi}getfile?fileName=${fileName}`);
                if (response.status === 200) {
                    const data = response.data;
                    
                    // Process the data
                    if (data.length) {
                        const dataHeaders = Object.keys(data[0]);
                        setCsvData(data);
                        setHeaders(dataHeaders);
                        generateInsights(data, dataHeaders);
                        
                        // Request AI to generate chart
                        getAiGeneratedChart(data);
                    }
                }
            } catch (error) {
                console.error('Error fetching CSV data:', error);
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchData();
    }, [fileName]);

    // Function to get AI response for chart generation
    const getAiResponse = async (userPrompt: string) => {
        setInRequest(true);
        abortControllerRef.current = new AbortController();
        
        try {
            const res = await fetch(process.env.NEXT_PUBLIC_pythonApi + 'query', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: userPrompt, fileName, userName }),
                signal: abortControllerRef.current.signal,
            });
            
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            
            const resData = await res.json();
            console.log(resData);
            return { status: "Success", resData };
        } catch (error: unknown) {
            if (error instanceof Error) {
                if (error.name === 'AbortError') {
                    console.log('Request was aborted');
                    return { status: "AbortError", resData:{AIresponse:"Request was aborted",visuals:false }};
                } else {
                    console.error('Error:', error.message);
                    return { status: "Error", resData:{AIresponse: "An error occurred",visuals:false} };
                }
            } else {
                console.error('An unknown error occurred');
                return { status: "Error", resData:{AIresponse: "An unknown error occurred",visuals:false }};
            }
        } finally {
            setInRequest(false);
            abortControllerRef.current = null;
        }
    };

    // Function to request AI-generated chart
    const getAiGeneratedChart = async (data: DataItem[]) => {
        const prompt = "provide a summarised bar chart for the uploaded data";
        const aiResponse = await getAiResponse(prompt);
        
        if (aiResponse.status === "Success" && aiResponse.resData.visuals) {
            try {
                // Parse the visual data - assuming it's coming in a format we can use
                // This might need adjustment based on the actual format returned by the AI
                const chartData = JSON.parse(aiResponse.resData.visuals);
                setBarChartData(chartData);
            } catch (error) {
                console.error('Error parsing AI chart data:', error);
                // Fallback to generating a basic chart from the data
                generateBasicChart(data);
            }
        } else {
            // Fallback to generating a basic chart from the data
            generateBasicChart(data);
        }
    };

    // Fallback function to generate a basic chart
    const generateBasicChart = (data: DataItem[]) => {
        if (!data.length || !headers.length) return;
        
        // Find numeric and categorical columns
        const numericColumns = headers.filter(header => {
            return !isNaN(Number(data[0][header]));
        });
        
        const categoricalColumns = headers.filter(header => !numericColumns.includes(header));
        
        // Prepare bar chart data
        if (categoricalColumns.length > 0 && numericColumns.length > 0) {
            const categoryCol = categoricalColumns[0];
            const valueCol = numericColumns[0];
            
            const aggregatedData: {[key: string]: number} = {};
            
            data.forEach(row => {
                const category = row[categoryCol]?.toString() || 'Unknown';
                const value = Number(row[valueCol]) || 0;
                
                if (!aggregatedData[category]) {
                    aggregatedData[category] = 0;
                }
                aggregatedData[category] += value;
            });
            
            const chartData = Object.entries(aggregatedData).map(([name, value]) => ({
                name,
                value
            })).slice(0, 10);
            
            setBarChartData(chartData);
        }
    };

    const generateInsights = (data: DataItem[], dataHeaders: string[]) => {
        const newInsights: string[] = [];
        
        // Basic data summary
        newInsights.push(`Dataset contains ${data.length} rows and ${dataHeaders.length} columns.`);
        
        // Find numeric columns for analysis
        const numericColumns = dataHeaders.filter(header => {
            return !isNaN(Number(data[0][header]));
        });
        
        if (numericColumns.length > 0) {
            // Basic statistics for numeric columns
            numericColumns.forEach(column => {
                const values = data.map(row => Number(row[column])).filter(val => !isNaN(val));
                
                if (values.length > 0) {
                    const sum = values.reduce((acc, val) => acc + val, 0);
                    const avg = sum / values.length;
                    const max = Math.max(...values);
                    const min = Math.min(...values);
                    
                    newInsights.push(
                        `Column "${column}": Average: ${avg.toFixed(2)}, Min: ${min}, Max: ${max}`
                    );
                }
            });
        }
        
        // Find categorical columns
        const categoricalColumns = dataHeaders.filter(header => !numericColumns.includes(header));
        
        if (categoricalColumns.length > 0 && categoricalColumns[0]) {
            const firstCatColumn = categoricalColumns[0];
            const categories = new Set();
            data.forEach(row => categories.add(row[firstCatColumn]));
            
            newInsights.push(`Column "${firstCatColumn}" has ${categories.size} unique values.`);
        }
        
        setInsights(newInsights);
    };

    const renderBarChart = () => {
        if (!barChartData.length) return null;
        
        return (
            <div className="h-64 md:h-80 w-full">
                <div className="mb-2">
                    <h3 className="text-lg font-medium text-white">Data Summary</h3>
                </div>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill="#8884d8">
                            {barChartData.map((entry, index) => (
                                <Cell 
                                    key={`cell-${index}`} 
                                    fill={COLORS[index % COLORS.length]} 
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        );
    };

    return (
        <div className="flex flex-col gap-10 text-white">
            {/* File header */}
            <div className='flex justify-between bg-[#234d70] border border-[#495d81] rounded-lg p-4'>
                <div className='flex items-center gap-1'>
                    <RiFileExcel2Line className='text-2xl' />
                    {fileName}
                </div>
                <button onClick={() => route.replace("/UploadPage")}><RxCross2 className='text-lg' /></button>
            </div>
            
            {isLoading || inRequest ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : (
                <>
                    {/* Dashboard metrics */}
                    {csvData.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="bg-[#1e293b] p-4 rounded-lg">
                                <div className="text-xl font-bold mb-2">Rows Count</div>
                                <div className="text-2xl">{csvData.length}</div>
                            </div>
                            <div className="bg-[#1e293b] p-4 rounded-lg">
                                <div className="text-xl font-bold mb-2">Columns</div>
                                <div className="text-2xl">{headers.length}</div>
                            </div>
                        </div>
                    )}
                    
                    {/* AI-generated Bar Chart */}
                    {csvData.length > 0 && (
                        <div className="bg-[#1e293b] p-6 rounded-lg mb-6">
                            {renderBarChart()}
                        </div>
                    )}
                    
                    {/* Insights */}
                    {insights.length > 0 && (
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-4 text-white">Data Insights</h2>
                            <div className="bg-[#1e293b] shadow rounded-lg p-6">
                                <ul className="space-y-2">
                                    {insights.map((insight, index) => (
                                        <li key={index} className="text-gray-300">
                                            • {insight}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </>
            )}
            
            {/* Start Chat button */}
            <div className='flex flex-col gap-1'>
                <div className='gradient-border h-[3.8rem]'>
                    <button onClick={() => { route.replace(`/ChatPage?fileName=${fileName}`) }} className='h-full w-full items-center justify-center bg-black rounded-[5px]'>
                        <span className='gradient-text font-bold'>Start Chat 🡪</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default function Page() {
    return (
        <Suspense fallback={<div className="text-white">Loading...</div>}>
            <StartChat />
        </Suspense>
    );
}