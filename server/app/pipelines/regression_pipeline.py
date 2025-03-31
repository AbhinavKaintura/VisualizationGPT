


import pandas as pd
import json
import os
import numpy as np
import xgboost as xgb
import matplotlib.pyplot as plt
from datetime import datetime
from typing import Dict, Any
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
from app.pipelines.smart_query import append_suggestions_to_output


from scipy import stats
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder

# Assuming these are defined elsewhere in your project
from app.services.logger import log
from VARIABLES import coding_model
from app.services.brain import use_brain



class RegressionHelper:
    def __init__(self, df: pd.DataFrame = None):
        self.project_dir = os.getcwd()
        self.df = df
        self.preprocessor = None

    def preprocess_data(self, X):
        """
        Preprocess the data by handling categorical and numerical columns
        
        Args:
            X (pd.DataFrame): Input dataframe
        
        Returns:
            pd.DataFrame: Preprocessed dataframe
        """
        # Identify column types
        numeric_features = X.select_dtypes(include=['int64', 'float64']).columns
        categorical_features = X.select_dtypes(include=['object', 'category']).columns
        
        # Create preprocessor
        preprocessor = ColumnTransformer(
            transformers=[
                ('num', StandardScaler(), numeric_features),
                ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_features)
            ])
        
        # Fit and transform
        X_processed = preprocessor.fit_transform(X)
        
        # Get feature names
        onehot_categories = preprocessor.named_transformers_['cat'].get_feature_names_out(categorical_features).tolist() if len(categorical_features) > 0 else []
        processed_feature_names = numeric_features.tolist() + onehot_categories
        
        # Convert to DataFrame
        X_processed_df = pd.DataFrame(
            X_processed, 
            columns=processed_feature_names, 
            index=X.index
        )
        
        # Store preprocessor for later use
        self.preprocessor = preprocessor
        
        return X_processed_df, processed_feature_names

    def set_dataframe(self, df: pd.DataFrame):
        """Set the dataframe to use for regression tasks"""
        self.df = df

    def extract_regression_params(self, user_query: str) -> Dict[str, Any]:
        """Extract regression parameters using LLM."""
        df_columns = self.df.columns.tolist()
        
        system_prompt = f"""
        You are a regression assistant. Extract the following information from the user query:
        1. Target variable name from: {df_columns}
        2. Feature column names (a subset of {df_columns}, excluding the target)
        
        Respond with ONLY a raw JSON object without any markdown formatting (no ```json tags).
        Format:
        {{
            "target": "exact_column_name",
            "features": ["feature1", "feature2", "feature3"]
        }}
        """
        
        messages = [{"role": "system", "content": system_prompt}, 
                   {"role": "user", "content": user_query}]
        
        # Assuming use_brain is defined elsewhere
        response = use_brain(messages=messages, model=coding_model)
        
        try:
            params = json.loads(response.strip())
            return {
                "target_column": params['target'],
                "feature_columns": params['features']
            }
        except json.JSONDecodeError as e:
            log(f"JSON decode error: {str(e)}")
            log(f"Raw response: {response}")
            raise ValueError(f"Invalid JSON response from LLM: {str(e)}")

    def train_regression_model(self, params: Dict[str, Any]):
        """Train an XGBoost regression model and return predictions."""
        # Select features and target
        X = self.df[params['feature_columns']]
        y = self.df[params['target_column']]
        
        # Preprocess data
        X_processed, processed_feature_names = self.preprocess_data(X)
        
        # Split the data
        X_train, X_test, y_train, y_test = train_test_split(
            X_processed, y, test_size=0.2, random_state=42
        )
        
        # Train XGBoost with preprocessed features
        model = xgb.XGBRegressor(
            objective='reg:squarederror', 
            n_estimators=100, 
            random_state=42,
            enable_categorical=True  # Enable categorical support
        )
        model.fit(X_train, y_train)
        
        # Predict
        predictions = model.predict(X_test)
        mse = mean_squared_error(y_test, predictions)
        
        return X_test, y_test, predictions, mse, processed_feature_names

    def plot_regression_results(self, y_test, predictions, params: Dict[str, Any]):
        """
        Plot actual vs predicted values
        
        Args:
            y_test (pd.Series): Actual target values
            predictions (np.array): Predicted values
            params (Dict[str, Any]): Regression parameters
        """
        plt.figure(figsize=(10, 6))
        plt.scatter(y_test, predictions, alpha=0.6, color='blue')
        plt.plot([min(y_test), max(y_test)], [min(y_test), max(y_test)], linestyle='--', color='red')
        plt.xlabel("Actual Values")
        plt.ylabel("Predicted Values")
        plt.title(f"Actual vs Predicted - {params['target_column']}")
        plt.grid()
        plt.show()

def trigger_regression_pipeline(prompt: str, fileName: str, userName: str):
    """Main function to process NLP query and run regression pipeline."""
    try:
        helper = RegressionHelper()
        
        log("Loading data...")
        df = pd.read_csv(os.path.join('Uploads', fileName))
        
        # Set the dataframe for the helper instance
        helper.set_dataframe(df)
        
        log("Extracting parameters from query...")
        params = helper.extract_regression_params(prompt)
        
        log("Training regression model...")
        X_test, y_test, predictions, mse, processed_feature_names = helper.train_regression_model(params)
        
        log("Formatting output...")
        # Create results DataFrame with comprehensive metrics
        results_df = X_test.copy()
        results_df['Actual'] = y_test
        results_df['Predicted'] = predictions
        results_df['Difference'] = results_df['Actual'] - results_df['Predicted']
        
        # Prepare Excel writers to create multiple sheets
        now = datetime.now()
       
        gen_csv_name= f'{now.strftime("ADAI_RegressionTable_%d_%m_%H_%M_%S")}.csv'
        csv_path = f'GeneratedCSV/{gen_csv_name}'

        results_df.to_csv(csv_path, index=False)

        response = f"""Regression analysis completed for predicting {params['target_column']} using {len(params['feature_columns'])} features.
        Model performance: Mean Squared Error (MSE): {mse:.4f}, RMSE: {np.sqrt(mse):.4f}
        Results saved to {gen_csv_name}"""

        # Apply smart query suggestions to the response
        enhanced_response = append_suggestions_to_output(response)

        return gen_csv_name ,enhanced_response




        
    except Exception as e:
        log(f"Error in regression pipeline: {str(e)}")
        raise Exception(f"Regression generation failed: {str(e)}")
