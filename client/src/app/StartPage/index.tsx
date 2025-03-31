// pages/index.tsx
'use client'
import { useState, useRef, useEffect } from 'react';
import { parse } from 'papaparse';
import dynamic from 'next/dynamic';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import Link from 'next/link';
import Page from '../UploadPage/page';

// Dynamic import for components that should only render on client-side
const DashboardCard = dynamic(() => import('../StartPage/components/DashboardCard'), { ssr: false });

interface DataItem {
  [key: string]: string | number;
}

interface FilterState {
  category: string | null;
  value: string | number | null;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#8dd1e1'];

const StartPage = () => {
  const [csvData, setCsvData] = useState<DataItem[]>([]);
  const [filteredData, setFilteredData] = useState<DataItem[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [insights, setInsights] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterState>({ category: null, value: null });
  const [pieChartData, setPieChartData] = useState<any[]>([]);
  const [secondBarChartData, setSecondBarChartData] = useState<any[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    
    parse(file, {
      header: true,
      complete: (results) => {
        const data = results.data as DataItem[];
        if (data.length) {
          const dataHeaders = Object.keys(data[0]);
          setCsvData(data);
          setFilteredData(data);
          setHeaders(dataHeaders);
          generateInsights(data, dataHeaders);
          prepareChartData(data, dataHeaders);
        }
        setIsLoading(false);
      },
      error: (error) => {
        console.error('Error parsing CSV:', error);
        setIsLoading(false);
      }
    });
  };

  // Update all charts when active filter changes
  useEffect(() => {
    if (!csvData.length) return;

    let newFilteredData = [...csvData];
    
    // Apply filter if active
    if (activeFilter.category && activeFilter.value !== null) {
      newFilteredData = csvData.filter(item => 
        item[activeFilter.category as string]?.toString() === activeFilter.value?.toString()
      );
    }

    setFilteredData(newFilteredData);
    prepareChartData(newFilteredData, headers);
    generateInsights(newFilteredData, headers);
  }, [activeFilter, csvData]);

  const prepareChartData = (data: DataItem[], dataHeaders: string[]) => {
    // Find numeric and categorical columns
    const numericColumns = dataHeaders.filter(header => {
      return !isNaN(Number(data[0][header]));
    });
    
    const categoricalColumns = dataHeaders.filter(header => !numericColumns.includes(header));
    
    // Prepare pie chart data (using first categorical column and first numeric column)
    if (categoricalColumns.length > 0 && numericColumns.length > 0) {
      const categoryCol = categoricalColumns[0];
      const valueCol = numericColumns[0];
      
      // Aggregate data by category
      const aggregatedData: {[key: string]: number} = {};
      
      data.forEach(row => {
        const category = row[categoryCol]?.toString() || 'Unknown';
        const value = Number(row[valueCol]) || 0;
        
        if (!aggregatedData[category]) {
          aggregatedData[category] = 0;
        }
        aggregatedData[category] += value;
      });
      
      // Convert to format needed for PieChart
      const pieData = Object.entries(aggregatedData).map(([name, value]) => ({
        name,
        value
      })).slice(0, 8); // Limit to 8 categories for better visibility
      
      setPieChartData(pieData);
    }
    
    // Prepare second bar chart data (using second categorical column if available)
    if (categoricalColumns.length > 1 && numericColumns.length > 0) {
      const categoryCol = categoricalColumns[1] || categoricalColumns[0];
      const valueCol = numericColumns.length > 1 ? numericColumns[1] : numericColumns[0];
      
      // Aggregate data by category
      const aggregatedData: {[key: string]: number} = {};
      
      data.forEach(row => {
        const category = row[categoryCol]?.toString() || 'Unknown';
        const value = Number(row[valueCol]) || 0;
        
        if (!aggregatedData[category]) {
          aggregatedData[category] = 0;
        }
        aggregatedData[category] += value;
      });
      
      // Convert to format needed for BarChart
      const barData = Object.entries(aggregatedData).map(([name, value]) => ({
        name,
        value
      })).slice(0, 10); // Limit to 10 categories
      
      setSecondBarChartData(barData);
    } else if (numericColumns.length > 1) {
      // If no second categorical column, use first categorical and second numeric
      const categoryCol = categoricalColumns[0];
      const valueCol = numericColumns[1];
      
      // Aggregate data by category
      const aggregatedData: {[key: string]: number} = {};
      
      data.forEach(row => {
        const category = row[categoryCol]?.toString() || 'Unknown';
        const value = Number(row[valueCol]) || 0;
        
        if (!aggregatedData[category]) {
          aggregatedData[category] = 0;
        }
        aggregatedData[category] += value;
      });
      
      // Convert to format needed for BarChart
      const barData = Object.entries(aggregatedData).map(([name, value]) => ({
        name,
        value
      })).slice(0, 10); // Limit to 10 categories
      
      setSecondBarChartData(barData);
    }
  };

  const generateInsights = (data: DataItem[], dataHeaders: string[]) => {
    const newInsights: string[] = [];
    
    // Add filter state to insights if applied
    if (activeFilter.category && activeFilter.value !== null) {
      newInsights.push(`Filtered by ${activeFilter.category}: ${activeFilter.value}`);
      newInsights.push(`Showing ${data.length} of ${csvData.length} rows (${((data.length/csvData.length)*100).toFixed(1)}%)`);
    }
    
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

  // Handle click on bar/pie chart elements to set filter
  const handleChartElementClick = (data: any, category: string) => {
    if (activeFilter.category === category && activeFilter.value === data.name) {
      // If clicking the same element, clear the filter
      setActiveFilter({ category: null, value: null });
    } else {
      // Set new filter
      setActiveFilter({
        category: category,
        value: data.name
      });
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setActiveFilter({ category: null, value: null });
  };

  const renderStackedBarChart = () => {
    if (!filteredData.length || headers.length < 2) return null;
    
    // Find numeric columns for visualization
    const numericHeaders = headers.filter(header => {
      return !isNaN(Number(filteredData[0][header]));
    });
    
    // Get categorical column for X-axis (first non-numeric column)
    const categoryHeader = headers.find(header => !numericHeaders.includes(header)) || headers[0];
    
    // Limit data points for better visualization
    const limitedData = filteredData.slice(0, 10);
    
    return (
      <div className="h-64 md:h-80 w-full">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-medium">Stacked Bar Chart</h3>
          {activeFilter.category === categoryHeader && (
            <span className="text-sm bg-blue-100 text-blue-800 py-1 px-2 rounded-full">
              Filtered by: {activeFilter.value}
            </span>
          )}
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={limitedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={categoryHeader} />
            <YAxis />
            <Tooltip />
            <Legend />
            {numericHeaders.slice(0, 3).map((header, index) => (
              <Bar 
                key={header} 
                dataKey={header} 
                stackId="a" 
                fill={COLORS[index % COLORS.length]} 
                onClick={(data) => handleChartElementClick(data, categoryHeader)}
                cursor="pointer"
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  };

  const renderPieChart = () => {
    if (!pieChartData.length) return null;
    
    // Get the first categorical column for reference
    const categoricalColumns = headers.filter(header => {
      return isNaN(Number(filteredData[0][header]));
    });
    
    const categoryHeader = categoricalColumns[0] || headers[0];
    
    return (
      <div className="h-64 md:h-80 w-full">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-medium">Distribution by {categoryHeader}</h3>
          {activeFilter.category === categoryHeader && (
            <span className="text-sm bg-blue-100 text-blue-800 py-1 px-2 rounded-full">
              Filtered by: {activeFilter.value}
            </span>
          )}
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieChartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              onClick={(data) => handleChartElementClick(data, categoryHeader)}
              cursor="pointer"
            >
              {pieChartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]} 
                  stroke={activeFilter.value === entry.name ? '#000' : undefined}
                  strokeWidth={activeFilter.value === entry.name ? 2 : undefined}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  };

  const renderSecondBarChart = () => {
    if (!secondBarChartData.length) return null;
    
    // Get the second categorical column for reference
    const categoricalColumns = headers.filter(header => {
      return isNaN(Number(filteredData[0][header]));
    });
    
    const categoryHeader = categoricalColumns.length > 1 ? categoricalColumns[1] : categoricalColumns[0];
    
    return (
      <div className="h-64 md:h-80 w-full">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-medium">Value Comparison by {categoryHeader}</h3>
          {activeFilter.category === categoryHeader && (
            <span className="text-sm bg-blue-100 text-blue-800 py-1 px-2 rounded-full">
              Filtered by: {activeFilter.value}
            </span>
          )}
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={secondBarChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar 
              dataKey="value" 
              fill="#8884d8" 
              onClick={(data) => handleChartElementClick(data, categoryHeader)}
              cursor="pointer"
            >
              {secondBarChartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]} 
                  stroke={activeFilter.value === entry.name ? '#000' : undefined}
                  strokeWidth={activeFilter.value === entry.name ? 2 : undefined}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">CSV Data Insights</h1>
          <p className="mt-2 text-gray-600">Upload a CSV file to generate automatic insights and visualizations</p>
        </header>
        
        <section className="mb-8">
          <div className="flex items-center space-x-4">
            <label 
              htmlFor="csv-upload"
              className="px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-700"
            >
              Upload CSV
              <input
                id="csv-upload" 
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                ref={fileInputRef}
                className="hidden"
              />
            </label>
            {csvData.length > 0 && (
              <span className="text-sm text-green-600 font-medium">
                Uploaded successfully! ({csvData.length} rows)
              </span>
            )}                
            {/* <Link href="/UploadPage" className='bg-black'>Upload Page</Link> */}

            {activeFilter.category && (
              <button
                onClick={clearFilters}
                className="text-sm text-red-600 underline"
              >
                Clear filters
              </button>
            )}
          </div>
        </section>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          csvData.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <DashboardCard 
                  title="Rows Count"
                  value={`${filteredData.length}${activeFilter.category ? `/${csvData.length}` : ''}`}
                  icon="📊"
                />
                <DashboardCard 
                  title="Columns"
                  value={headers.length.toString()}
                  icon="📋"
                />

              </div>
              
              <div className="mb-8">
                {activeFilter.category && (
                  <div className="bg-blue-50 p-3 rounded-md mb-4">
                    <p className="text-blue-800">
                      <strong>Active Filter:</strong> {activeFilter.category} = {activeFilter.value}
                      <button 
                        onClick={clearFilters}
                        className="ml-3 text-sm bg-blue-200 text-blue-800 py-1 px-2 rounded hover:bg-blue-300"
                      >
                        Clear
                      </button>
                    </p>
                    <p className="text-sm text-blue-600 mt-1">
                      Click on chart elements to filter data or click the same element again to clear filter
                    </p>
                  </div>
                )}
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {renderStackedBarChart()}
                  {renderPieChart()}
                  {renderSecondBarChart()}
                </div>
              </div>
              
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Data Insights</h2>
                <div className="bg-white shadow rounded-lg p-6">
                  <ul className="space-y-2">
                    {insights.map((insight, index) => (
                      <li key={index} className="text-gray-700">
                        • {insight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          )
        )}
      </div>
      <div className='flex flex-col items-center justify-center h-96 w-full'>
      <Page/>
      </div>
      
    </div>

  );
};

export default StartPage;