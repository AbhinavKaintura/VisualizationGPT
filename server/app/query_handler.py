

import json
import sys
import os
import pandas as pd
sys.path.append(os.path.abspath(os.path.dirname(__file__)))
from flask import request, jsonify
from datas import data1, data2, data3, notimplimented, csvTestData
from csv_handler import extractDataPoints, extractJSON, extractdfvalue
from pipelines.generic_pipeline import trigger_generic_pipeline
from pipelines.table_pipeline import trigger_table_pipeline
from pipelines.decide_pipeline import decide_pipeline_via_LLM
from pipelines.summary_pipeline import trigger_summary_pipeline
from pipelines.graph_pipeline import trigger_graph_pipeline
from pipelines.forecast_pipeline import trigger_forecast_pipeline
from pipelines.regression_pipeline import trigger_regression_pipeline
from pipelines.reasoning_pipeline import trigger_analytical_pipeline
from pipelines.pivot_pipeline import trigger_pivot_table_pipeline
from services.logger import log
from conversation_memory import memory_manager

def agent():
    prompt = request.json.get('prompt')
    fileName = request.json.get('fileName')
    userName = 'test'
    
    match prompt:
        case "csv file test":
            return jsonify(csvTestData)
        case "Give me the month over month comparison of the OCREVUS_sales column.":
            return jsonify(data1)
        case "Give me the total sum of the OCREVUS_sales and the roc_sls_cer_cm5_ocr respectively.":
            return jsonify(data2)
        case "Give me a month wise comparision of OCREVUS_Sales and roc_sls_cer_cm5_ocr from the year 2020 - 2022":
            return jsonify(data3)
        case _:
            return jsonify(generateUsingLLM(prompt, fileName, userName))

def generateUsingLLM(prompt, fileName, userName):
    AIresponse = False
    visuals = []

    task = '''
    The assistant is responsible for responding to user queries.  
    If the user asks a follow-up question related to a suggested query, the assistant will:  
    1. Refer to the conversation history to understand the previous query and response.  
    2. Generate a relevant query based on the follow-up question and conversation context.  
    3. Send the generated query to the Decide LLM pipeline for an answer.  
    4. Provide the user with the response from the Decide LLM.  
    5. Record the AI response in the conversation history for continuity.  
    '''

    conversation_memory = memory_manager.get_conversation_history()

    # Form a clear and structured conversation prompt
    conversationprompt = f'''
The assistant is currently handling a user query. The assistant has access to the conversation history, which may help generate a better response.

## Task Description:
{task}

## Previous Conversation History:
{conversation_memory if conversation_memory else "No previous conversations available."}

## User Query:
{prompt}
'''

    # Process based on pipeline
    response = decide_pipeline_via_LLM(conversationprompt, fileName)
    pipeline = response.get("operation")

    result = None

    if pipeline == "TABLE":
        log("Generating Outputs using TABLE pipeline")
        Gen_Csv_name, textOutput = trigger_table_pipeline(conversationprompt, fileName, userName)
        AIresponse = textOutput
        visual = {
            "type": "table",
            # "text": textOutput,
            "name": Gen_Csv_name,
            "data_points": extractDataPoints(Gen_Csv_name)
        }
        visuals.append(visual)
        result = {"AIresponse": AIresponse, "visuals": visuals}

    elif pipeline == "SUMMARIZATION":
        log("Generating Outputs using summary pipeline")
        AIresponse = trigger_summary_pipeline(conversationprompt, fileName, userName)
        result = {"AIresponse": AIresponse, "visuals": visuals if visuals else False}

    elif pipeline == "GRAPH":
        log("Generating Outputs using Graph pipeline")
        Gen_JSON_name, textOutput = trigger_graph_pipeline(conversationprompt, fileName, userName)
        graph_type, data_points = extractJSON(Gen_JSON_name)
        visual = {
            "type": graph_type,
            "text": textOutput,
            "name": Gen_JSON_name,
            "data_points": data_points
        }
        visuals.append(visual)
        result = {"AIresponse": AIresponse, "visuals": visuals}

    elif pipeline == "FORECASTING":
        log("Generating Outputs using FORECASTING pipeline")
        Gen_JSON_name, textOutput = trigger_forecast_pipeline(conversationprompt, fileName, userName)
        forecast_type, data_points = extractJSON(Gen_JSON_name)
        visual = {
            "type": "forecast",
            "text": textOutput,
            "name": Gen_JSON_name,
            "data_points": data_points
        }
        visuals.append(visual)
        result = {"AIresponse": AIresponse, "visuals": visuals}

    elif pipeline == "REGRESSION":
        log("Generating Outputs using REGRESSION pipeline")
        Gen_Csv_name = trigger_regression_pipeline(conversationprompt, fileName, userName)
        visual = {
            "type": "table",
            "name": Gen_Csv_name,
            "data_points": extractDataPoints(Gen_Csv_name)
        }
        visuals.append(visual)
        result = {"AIresponse": AIresponse, "visuals": visuals}

    elif pipeline == "REASONING":
        log("Generating Outputs using REASONING pipeline")
        textOutput = trigger_analytical_pipeline(conversationprompt, fileName, userName)
        result = {"AIresponse": textOutput, "visuals": False}

    elif pipeline == "PIVOT_TABLE":
        log("Generating Outputs using PIVOT pipeline")
        Gen_Csv_name, textOutput = trigger_pivot_table_pipeline(conversationprompt, fileName, userName)
        visual = {
            "type": "table",
            "text": textOutput,
            "name": Gen_Csv_name,
            "data_points": extractDataPoints(Gen_Csv_name)
        }
        visuals.append(visual)
        result = {"AIresponse": AIresponse, "visuals": visuals}

    else:
        log("Generating Outputs using GENERIC pipeline")
        AIresponse = trigger_generic_pipeline(conversationprompt, fileName, userName)
        result = {"AIresponse": AIresponse, "visuals": visuals if visuals else False}

    # Save the conversation for continuity
    memory_manager.update_conversation_memory(prompt, AIresponse)

    return result
