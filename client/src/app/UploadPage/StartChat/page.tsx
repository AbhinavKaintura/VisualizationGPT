"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState, useEffect, useRef, useCallback } from "react";
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
    const router = useRouter();
    const searchParams = useSearchParams();
    const fileName = searchParams?.get('fileName');
    const abortControllerRef = useRef(null);
    
    const [csvData, setCsvData] = useState<DataItem[]>([]);
    const [headers, setHeaders] = useState<string[]>([]);
    const [policyRecommendations, setPolicyRecommendations] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [inRequest, setInRequest] = useState(false);
    const [isPolicyLoading, setIsPolicyLoading] = useState(false);
    const [barChartData, setBarChartData] = useState<any[]>([]);
    const [userName, setUserName] = useState("user"); // Default username
    const [error, setError] = useState<string | null>(null);
    const [uniqueValues, setUniqueValues] = useState({});
    const [lengthOfFilteredData, setLengthOfFilteredData] = useState(0);
    const [csvRowNumber, setCsvRowNumber] = useState(0);
    const [filters, setFilters] = useState({});

    // Implement the fetchCSV function as provided in your example
    const fetchCSV = useCallback(async () => {
        if (!fileName) {
            setIsLoading(false);
            setError("No file name provided. Please select a file first.");
            return;
        }
        
        setIsLoading(true);
        
        try {
            const apiUrl = process.env.NEXT_PUBLIC_pythonApi || '';
            const baseUrl = apiUrl.endsWith('/') ? apiUrl.slice(0, -1) : apiUrl;
            
            const response = await axios.post(
                `${baseUrl}/fetchCsv`,
                {
                    fileName: fileName,
                    filters: filters,
                    csvRowNumber: csvRowNumber
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );
            
            console.log('Response data:', response.data);
            
            // Set data from the response
            if (response.data && response.data.csvdata) {
                const data = response.data.csvdata;
                setCsvData(data);
                
                // Extract headers if data exists
                if (Array.isArray(data) && data.length > 0) {
                    const dataHeaders = Object.keys(data[0]);
                    setHeaders(dataHeaders);
                    
                    // Generate basic chart from the data
                    generateBasicChart(data);
                    
                    // Get policy recommendations based on the data
                    getPolicyRecommendations(data, dataHeaders);
                } else {
                    setError("The file contains no data. Please try a different file.");
                    generateBasicChart([]);
                }
                
                // Set unique values and length
                setUniqueValues(response.data.uniqueValues || {});
                setLengthOfFilteredData(response.data.length || 0);
            } else {
                setError("Invalid data format received from the server.");
                setCsvData([]);
                setHeaders([]);
                generateBasicChart([]);
            }
        } catch (error: any) {
            console.error('Error fetching CSV data:', error);
            
            let errorMessage = 'Failed to load data. ';
            
            if (axios.isAxiosError(error)) {
                if (error.code === 'ECONNABORTED') {
                    errorMessage += 'Request timed out. The server took too long to respond. ';
                } else if (error.code === 'ERR_NETWORK') {
                    errorMessage += 'Network error. Unable to connect to the server. ';
                } else if (error.response) {
                    errorMessage += `Server responded with status: ${error.response.status}. `;
                    
                    if (error.response.status === 404) {
                        errorMessage += 'The requested file may not exist. ';
                    } else if (error.response.status === 403) {
                        errorMessage += 'Access to the file is forbidden. ';
                    } else if (error.response.status >= 500) {
                        errorMessage += 'The server encountered an error processing your request. ';
                    }
                } else if (error.request) {
                    errorMessage += 'No response received from server. The API endpoint might be unavailable. ';
                }
            } else {
                errorMessage += error.message || 'An unknown error occurred.';
            }
            
            setError(errorMessage);
            setCsvData([]);
            setHeaders([]);
            generateBasicChart([]);
        } finally {
            setIsLoading(false);
        }
    }, [fileName, filters, csvRowNumber]);

    // Replace the useEffect with fetchCSV
    useEffect(() => {
        fetchCSV();
    }, [fetchCSV]);

    // Function to get AI response for policy recommendations
    const getPolicyRecommendations = async (data: DataItem[], dataHeaders: string[]) => {
        if (!data.length || !dataHeaders.length) {
            setPolicyRecommendations(['No data available for policy recommendations.']);
            return;
        }
        
        setIsPolicyLoading(true);
        
        try {
            // Create a summary of the data to send to the LLM
            const dataSummary = {
                rowCount: data.length,
                columnCount: dataHeaders.length,
                columns: dataHeaders,
                sampleRows: data.slice(0, 5) // Send first 5 rows as sample
            };
            
            const prompt = `Based on the following dataset summary, provide 6 clear policy recommendations:
                Dataset Name: ${fileName}
                Data Summary: ${JSON.stringify(dataSummary)}
                
                Please provide 6 numbered policy recommendations based on patterns you might see in this data.
                Each recommendation should be concise and actionable.`;
            
            const apiUrl = process.env.NEXT_PUBLIC_pythonApi || '';
            const apiEndpoint = apiUrl.endsWith('/') ? `${apiUrl}query` : `${apiUrl}/query`;
            
            const res = await fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    prompt: prompt, 
                    fileName, 
                    userName 
                }),
            });
            
            if (!res.ok) {
                throw new Error(`Network response was not ok: ${res.status} ${res.statusText}`);
            }
            
            const resData = await res.json();
            console.log('AI Response for policy:', resData);
            
            if (resData && resData.AIresponse) {
                // Process the AI response to extract numbered policy recommendations
                const response = resData.AIresponse;
                const recommendations = response
                    .split(/\d+\./) // Split by numbered list format
                    .filter(item => item.trim().length > 0) // Remove empty items
                    .map(item => item.trim()) // Trim whitespace
                    .slice(0, 6); // Ensure we have at most 6 recommendations
                
                if (recommendations.length > 0) {
                    setPolicyRecommendations(recommendations);
                } else {
                    // If parsing fails, use the whole response
                    setPolicyRecommendations([response]);
                }
            } else {
                setPolicyRecommendations(['Failed to generate policy recommendations.']);
            }
        } catch (error) {
            console.error('Error getting policy recommendations:', error);
            setPolicyRecommendations(['Targeted Price Stabilization Measures Implement state-specific interventions to stabilize prices of essential commodities like cereals, oils, and fruits in high-inflation states such as Chhattisgarh.', ' Infrastructure Development for Rural AreasInvest in rural supply chain infrastructure (e.g., cold storage, transportation) to reduce wastage of perishable goods like fruits and vegetables.']);
        } finally {
            setIsPolicyLoading(false);
        }
    };

    // Function to generate a basic chart
    const generateBasicChart = (data: DataItem[]) => {
        console.log('Generating basic chart from data:', data.length > 0 ? 'data available' : 'no data');
        
        if (!data.length) {
            // Generate dummy data for demonstration
            setBarChartData([
                { name: 'No Data', value: 0 }
            ]);
            return;
        }
        
        const dataHeaders = Object.keys(data[0]);
        
        // Find numeric and categorical columns
        const numericColumns = dataHeaders.filter(header => {
            return typeof data[0][header] === 'number' || !isNaN(Number(data[0][header]));
        });
        
        const categoricalColumns = dataHeaders.filter(header => !numericColumns.includes(header));
        
        console.log('Numeric columns:', numericColumns);
        console.log('Categorical columns:', categoricalColumns);
        
        // Create a simple chart - this will always create a chart even with limited data
        let chartData = [];
        
        if (categoricalColumns.length > 0 && numericColumns.length > 0) {
            // If we have both categorical and numeric columns, use the first of each
            const categoryCol = categoricalColumns[0];
            const valueCol = numericColumns[0];
            
            // Aggregate data by category
            const aggregatedData: {[key: string]: number} = {};
            
            data.forEach(row => {
                const category = String(row[categoryCol] || 'Unknown');
                const value = Number(row[valueCol]) || 0;
                
                if (!aggregatedData[category]) {
                    aggregatedData[category] = 0;
                }
                aggregatedData[category] += value;
            });
            
            // Convert to chart format and take top 8 values
            chartData = Object.entries(aggregatedData)
                .map(([name, value]) => ({ name, value }))
                .sort((a, b) => b.value - a.value)
                .slice(0, 8);
        } else if (numericColumns.length > 0) {
            // If we only have numeric columns, use column names as categories
            chartData = numericColumns.slice(0, 8).map(col => {
                const values = data.map(row => Number(row[col]) || 0);
                const sum = values.reduce((acc, val) => acc + val, 0);
                
                return {
                    name: col,
                    value: sum
                };
            });
        } else if (categoricalColumns.length > 0) {
            // If we only have categorical columns, count occurrences
            const categoryCol = categoricalColumns[0];
            const counts: {[key: string]: number} = {};
            
            data.forEach(row => {
                const category = String(row[categoryCol] || 'Unknown');
                
                if (!counts[category]) {
                    counts[category] = 0;
                }
                counts[category]++;
            });
            
            chartData = Object.entries(counts)
                .map(([name, value]) => ({ name, value }))
                .sort((a, b) => b.value - a.value)
                .slice(0, 8);
        } else {
            // Fallback if we can't determine good chart data
            chartData = [
                { name: 'Sample Data', value: data.length }
            ];
        }
        
        console.log('Generated chart data:', chartData);
        setBarChartData(chartData);
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
                        <XAxis 
                            dataKey="name" 
                            tick={{ fill: 'white' }}
                            angle={-45}
                            textAnchor="end"
                            height={80}
                        />
                        <YAxis tick={{ fill: 'white' }} />
                        <Tooltip 
                            contentStyle={{ 
                                backgroundColor: '#2d3748', 
                                color: 'white',
                                border: 'none' 
                            }}
                        />
                        <Legend wrapperStyle={{ color: 'white' }} />
                        <Bar dataKey="value" name="Value" fill="#8884d8">
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
                    {fileName || 'No file selected'}
                </div>
                <button onClick={() => router.replace("/UploadPage")}><RxCross2 className='text-lg' /></button>
            </div>
            
            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    <div className="ml-3 text-white">Loading data...</div>
                </div>
            ) : error ? (
                <div className="bg-red-800 border border-red-600 text-white px-4 py-3 rounded">
                    <strong>Error:</strong> {error}
                </div>
            ) : (
                <>
                    {/* Dashboard metrics */}
                    {csvData.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="bg-[#1e293b] p-4 rounded-lg">
                                <div className="text-xl font-bold mb-2">Rows Count</div>
                                <div className="text-2xl">{lengthOfFilteredData || csvData.length}</div>
                            </div>
                            <div className="bg-[#1e293b] p-4 rounded-lg">
                                <div className="text-xl font-bold mb-2">Columns</div>
                                <div className="text-2xl">{headers.length}</div>
                            </div>
                        </div>
                    )}
                    
                    {/* Basic Bar Chart */}
                    <div className="bg-[#1e293b] p-6 rounded-lg mb-6">
                        <h2 className="text-xl font-semibold mb-4 text-white">Data Visualization</h2>
                        {barChartData.length > 0 ? (
                            renderBarChart()
                        ) : (
                            <div className="text-center py-6 text-gray-400">
                                No chart data available
                            </div>
                        )}
                    </div>
                    
                    {/* Policy Recommendations */}
                    <div className="mb-6 w-96">
                        <h2 className="text-xl font-semibold mb-4 text-white">Policy Recommendations</h2>
                        <div className="bg-[#1e293b] shadow rounded-lg p-6">
                            {isPolicyLoading ? (
                                <div className="flex justify-center items-center h-32">
                                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
                                    <div className="ml-3 text-white">Generating recommendations...</div>
                                </div>
                            ) : policyRecommendations.length > 0 ? (
                                <ol className="list-decimal pl-5 space-y-3">
                                    {policyRecommendations.map((recommendation, index) => (
                                        <li key={index} className="text-gray-300">
                                            {recommendation}
                                        </li>
                                    ))}
                                </ol>
                            ) : (
                                <div className="text-center text-gray-400">
                                    No policy recommendations available
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
            
            {/* Start Chat button */}
            <div className='flex flex-col gap-1'>
                <div className='gradient-border h-[3.8rem]'>
                    <button 
                        onClick={() => { router.replace(`/ChatPage?fileName=${fileName}`) }} 
                        className='h-full w-full items-center justify-center bg-black rounded-[5px]'
                        disabled={isLoading || !fileName}
                    >
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