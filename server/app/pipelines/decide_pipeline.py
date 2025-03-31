import os
import pandas as pd
import json
import re
from app.services.brain import use_brain
from VARIABLES import analytical_model
from app.services.logger import log

project_dir = os.getcwd()

def decide_pipeline_via_LLM(input_prompt, fileName):
    """
    Uses an LLM to decide which pipeline needs to triggerred based on the input prompt

    ARGS:
        input_prompt (str) : prompt entered by the user in the GUI

    RETURNS:
        operation_type (str) : name of the pipeline to be triggered
    """
    df = pd.read_csv(os.path.join('Uploads', fileName))
    df = df.head(4)

    base_system_prompt = """You are 'Insights AI', an expert in classifying user queries for data analysis. Your task is to identify the most appropriate operation type based on strict criteria.
    Here are the operation types and their EXACT use cases:

    1. 'GENERIC': Use ONLY for:
       - Basic calculations (sum, average, count)
       - Simple question-answering about data
       - When no other operation type clearly applies
       - Example  which city have the highest sales,
       - What is the total profit in central region

    2. 'REGRESSION': Use ONLY when:
       - Query explicitly mentions prediction or forecasting with specific variables
       - User wants to understand relationships between variables
       - Examples: "Predict sales based on marketing spend", "Find correlation between price and demand"

    3. 'CLUSTERING': Use ONLY when:
       - Query explicitly asks to group or cluster data points
       - User wants to find natural groupings in data
       - Examples: "Group similar customers", "Find patterns in user behavior"

    4. 'SEGMENTATION': Use ONLY when:
       - Query specifically asks to divide data into segments
       - User wants to create distinct categories
       - Examples: "Segment customers by age", "Divide market into categories"

    5. 'SUMMARIZATION': Use ONLY when:
       - Query asks what the data is about
       - User wants an overview of the dataset
       - Examples: "What does this data contain?", "Give me a summary of the dataset"

    6. 'FORECASTING': Use ONLY when:
       - Query explicitly mentions future predictions
       - Time series data is involved
       - Examples: "Predict next month's sales", "Forecast future trends"

    7. 'TABLE': Use ONLY when:
       - Query specifically asks for data in table format
       - User wants to see raw data
       - Examples: "Show me the data in table form", "Display records as table"

    8. 'GRAPH': Use ONLY when:
       - Query explicitly mentions visualization
       - User asks for charts, plots, or graphs
       - Examples: "Show sales trend in a graph", "Create a bar chart"

    9. 'REASONING': Use ONLY when:
       - Query starts with "WHY" or "HOW"
       - User seeks explanation or reasoning.
       - Examples: "Why did sales decrease?", "How does this trend affect growth?"
       - Query asks for analysis of trends, patterns or relationships

    10. 'PIVOT_TABLE': Use ONLY when:
        - Query explicitly mentions pivot tables
        - User wants to summarize data in a pivot table  
        - Examples: "Create a pivot table for sales data", "Summarize data using a pivot table"    

    IMPORTANT RULES:
    1. If query matches multiple types, prioritize in this order: REASONING > GRAPH > TABLE > FORECASTING > REGRESSION > CLUSTERING > SEGMENTATION > SUMMARIZATION > GENERIC
    2. If query is unclear, respond with {'operation': 'OUTPUT', 'message': 'Please specify...'} 
    3. For greetings or general questions about capabilities, use {'operation': 'OUTPUT', 'message': 'appropriate response'}
    4. Never attempt to execute operations, only classify them

    STRICT RULES:
    1. Return ONLY valid JSON with format {"operation": "TYPE"}
    2. For ambiguous queries return {"operation": "OUTPUT", "message": "Please specify..."}
    3. For greetings return {"operation": "OUTPUT", "message": "Hello! How can I help you analyze this data?"}
    4. Never explain or justify your choice
    5. Never attempt to execute operations
    """
    
    messages = [
        {"role": "system", "content": base_system_prompt},
        {"role": "assistant", "content": f"Dataset columns: {df.columns.values}\nFirst few rows: {df}"},
        {"role": "user", "content": input_prompt}
    ]

    response = use_brain(messages=messages, respond_in_json=True, model=analytical_model)
    log(f"Returning operation type: {json.loads(response)}")
    return json.loads(response)

# def detect_pipeline_via_nlp(query):
#     """
#     Detects which pipeline to trigger based on the presence of certain words in the input string.

#     Args:
#         query (str): The subject query.
        
#     Returns:
#         str: The name of the pipeline to trigger.
#     """
#     # Convert the query to lowercase
#     query = query.lower()

#     # Define patterns and their corresponding trigger names
#     patterns = {
#         r'\btable(s)?\b': 'TABLE',
#         r'\bgraph(s)?\b|\bchart(s)?\b|\bplot\b': 'GRAPH',
#         r'\bsummary\b|\bsumary\b|\bsummarise\b|\bsummarize\b|\bsumarise\b|\bsumarize\b': 'SUMMARIZATION',
#     }

#     # Search for the patterns in the lowercase query
#     for pattern, pipeline in patterns.items():
#         if re.search(pattern, query):
#             return pipeline

#     # Return None if no pattern is found
#     return "GENERIC"