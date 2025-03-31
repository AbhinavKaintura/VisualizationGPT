
import pandas as pd
import torch
import json
import os
import re
import numpy as np
from statsmodels.tsa.arima.model import ARIMA
from datetime import datetime
from typing import Dict, Any
from app.services.logger import log
from VARIABLES import cot_model
from app.services.brain import use_brain
from app.services.data_handler import create_dataframe
class ARIMAForecastingHelper:
    def __init__(self):
        pass


    def create_dataframe(data, columns=None, index=None):
        """
        Generic function to create a pandas DataFrame.

        Parameters:
        - data: dict, list of lists, NumPy array, list of dicts, Series, or another DataFrame.
        - columns: Optional, specifies column names if needed.
        - index: Optional, specifies index labels.

        Returns:
        - A pandas DataFrame.
        """
        try:
            df = pd.DataFrame(data, columns=columns, index=index)
            return df
        except Exception as e:
            print(f"Error creating DataFrame: {e}")
            return None 

    def extract_forecasting_params(self, data: Any, user_query: str) -> Dict[str, Any]:
        """
        Uses AI to extract forecasting parameters like target column and forecast period from an NLP query.
        """
        df = create_dataframe(data)  # Convert raw data to DataFrame
        if df is None:
            raise ValueError("Invalid data format for DataFrame.")
        
        df_columns = df.columns.tolist()
        
        messages = [
            {"role": "system", "content": f"Extract forecasting parameters (target column, forecast period) from the query. Available columns are: {df_columns}. Respond with a JSON containing 'target_column' and 'forecast_period' keys."},
            {"role": "user", "content": user_query}
        ]
        
        response = use_brain(messages=messages, model=cot_model)
        
        # Try to extract JSON from the response using regex
        json_match = re.search(r'\{.*\}', response, re.DOTALL)
        
        if json_match:
            try:
                params = json.loads(json_match.group(0))
                
                # Convert forecast period to integer
                if isinstance(params.get('forecast_period'), str):
                    if 'quarter' in params['forecast_period'].lower():
                        params['forecast_period'] = 3
                    elif 'month' in params['forecast_period'].lower():
                        params['forecast_period'] = 1
                    else:
                        params['forecast_period'] = 3  # default to 3 months
                
                # Ensure target column is capitalized and exists in dataframe
                params['target_column'] = params.get('target_column', 'Sales').capitalize()
                
                if params['target_column'] not in df.columns:
                    log(f"Warning: Specified column not found. Using first numeric column.")
                    # Find first numeric column
                    numeric_columns = df.select_dtypes(include=['int64', 'float64']).columns
                    if len(numeric_columns) > 0:
                        params['target_column'] = numeric_columns[0]
                    else:
                        raise ValueError("No numeric columns found for forecasting")
                
                return params
            except json.JSONDecodeError:
                # Fallback to default values if JSON parsing fails
                return {
                    "target_column": "Sales", 
                    "forecast_period": 3
                }
        else:
            # Fallback to default values if no JSON found
            return {
                "target_column": "Sales", 
                "forecast_period": 3
            }

    def forecast_sales(self, data: pd.DataFrame, date_column: str, target_column: str, forecast_period: int):
        """
        Forecasts sales using ARIMA model based on extracted parameters.
        """
        # Ensure the target column exists (case-insensitive)
        column_mapping = {col.lower(): col for col in data.columns}
        actual_target_column = column_mapping.get(target_column.lower())
        
        if not actual_target_column:
            raise ValueError(f"Column '{target_column}' not found in the dataset. Available columns: {list(data.columns)}")
        
        # Convert date column to datetime
        data[date_column] = pd.to_datetime(data[date_column])
        
        # Aggregate data by month
        df_monthly = data.groupby(pd.Grouper(key=date_column, freq='M'))[actual_target_column].sum()
        
        # Fit ARIMA model
        model_arima = ARIMA(df_monthly, order=(5,1,0))
        model_fit = model_arima.fit()
        
        # Forecast for given period
        forecast_values = model_fit.forecast(steps=forecast_period)
        
        # Create forecast DataFrame
        forecast_df = pd.DataFrame({
            'Date': pd.date_range(start=df_monthly.index[-1], periods=forecast_period+1, freq='M')[1:],
            'Forecasted Sales': forecast_values
        })
        
        return df_monthly, forecast_df
    




    def generate_graph_json(self, actual_sales: pd.Series, forecast_df: pd.DataFrame):
        """
        Generate graph JSON in a format compatible with existing pipeline.
        Ensures the forecast starts from the last actual point for continuity.
        """
        graph_data = {"graph_type": "line", "data_points": []}

        # Add historical data points
        for ts, value in zip(actual_sales.index, actual_sales.values):
            graph_data["data_points"].append({
                "timestamp": ts.strftime('%Y-%m-%d'), 
                "actual": float(value)  # Convert to float
            })

        # Ensure last actual data point is connected to the forecast
        if graph_data["data_points"]:
            graph_data["data_points"][-1].update({
                "forecast": graph_data["data_points"][-1]["actual"],
                "lower_bound": graph_data["data_points"][-1]["actual"],
                "upper_bound": graph_data["data_points"][-1]["actual"]
            })

        # Add forecast data points
        for ts, forecast in zip(forecast_df['Date'], forecast_df['Forecasted Sales']):
            graph_data["data_points"].append({
                "timestamp": ts.strftime('%Y-%m-%d'),
                "forecast": float(forecast),
                "lower_bound": float(forecast * 0.9),
                "upper_bound": float(forecast * 1.1)
            })

        # Add metadata
        graph_data["metadata"] = {
            "visualization_note": "ARIMA Forecast",
            "total_actual_points": int(len(actual_sales)),
            "forecast_points": int(len(forecast_df))
        }

        return graph_data
    

def generate_forecast_summary(actual_sales, forecast_df, target_column):
    """Generate a natural-sounding 50-60 word summary of the ARIMA forecast results."""
    
    # Calculate some basic insights
    last_actual = actual_sales.iloc[-1]
    first_forecast = forecast_df['Forecasted Sales'].iloc[0]
    percent_change = ((first_forecast - last_actual) / last_actual) * 100
    trend_direction = "increase" if percent_change > 0 else "decrease"
    
    # Generate summary using LLM
    messages = [
        {"role": "system", "content": """Generate a natural, conversational 50-60 word summary of forecast results.
        Avoid technical language or explicit labeling. Write as if you're explaining the forecast to a colleague in plain language.
        Focus on key trends and insights without using phrases like "the graph shows" or "the summary is".
        Keep it as a single flowing paragraph that sounds like natural speech."""},
        {"role": "user", "content": f"""
        Target: {target_column}
        Last actual value: {last_actual}
        First forecast value: {first_forecast}
        Percent change: {percent_change:.2f}%
        Trend: {trend_direction}
        Forecast length: {len(forecast_df)} periods
        
        Write a natural, conversational 50-60 word summary.
        """}
    ]
    
    summary = use_brain(messages=messages, model=cot_model)
    return summary.strip()



def trigger_forecast_pipeline(prompt: str, fileName: str, userName: str):
    """Main function to process NLP query and generate forecast."""
    try:
        helper = ARIMAForecastingHelper()
        log("Loading data...")
        df = pd.read_csv(os.path.join('Uploads', fileName))
        
        log("Extracting parameters from query...")
        params = helper.extract_forecasting_params(df, prompt)
        
        log("Generating forecast...")
        actual_sales, forecast_df = helper.forecast_sales(
            df, 
            date_column="OrderDate",
            target_column=params["target_column"], 
            forecast_period=params["forecast_period"]
        )
        
        log("Formatting output...")
        graph_data = helper.generate_graph_json(actual_sales, forecast_df)
        
        # Generate a summary of the forecast
        forecast_summary = generate_forecast_summary(actual_sales, forecast_df, params["target_column"])
        
        # Add the summary to the graph data
        graph_data["summary"] = forecast_summary
        
        # Ensure GeneratedJSON directory exists
        os.makedirs('GeneratedJSON', exist_ok=True)
        
        # Generate unique filename
        Gen_JSON_name = f"{datetime.now().strftime('ADAI_ForecastJson_%d_%m_%H_%M_%S')}.json"
        full_path = os.path.join('GeneratedJSON', Gen_JSON_name)
        
        # Save JSON
        with open(full_path, 'w') as f:
            json.dump(graph_data, f, indent=2, cls=NumpyEncoder)
        
        # Create a natural-sounding output that incorporates the summary without labels
        textOutput = f"I've analyzed the {params['target_column']} data and created a forecast for the next {params['forecast_period']} months. {forecast_summary}"
        
        # Add smart query suggestion
        from app.pipelines.smart_query import append_suggestions_to_output
        enhanced_output = append_suggestions_to_output(textOutput)
        
        return Gen_JSON_name, enhanced_output
    
    except Exception as e:
        log(f"Error in ARIMA forecast pipeline: {str(e)}")
        raise Exception(f"ARIMA Forecast generation failed: {str(e)}")

class NumpyEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.integer):
            return int(obj)
        elif isinstance(obj, np.floating):
            return float(obj)
        elif isinstance(obj, np.ndarray):
            return obj.tolist()
        return super().default(obj)