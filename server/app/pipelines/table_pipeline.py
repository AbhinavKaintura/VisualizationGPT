from datetime import datetime
import pandas as pd
import os
import warnings
warnings.filterwarnings("ignore")

from app.services.logger import log
from VARIABLES import coding_model
from app.services.code_execution_agent import extract_code, execute_code
from app.services.code_evaluation_agent import code_evaluation
from app.services.brain import use_brain
from app.pipelines.smart_query import append_suggestions_to_output

class TablePipelineHelper:
    def __init__(self):
        self.project_dir = os.getcwd()
        self.uploads_dir = os.path.join(self.project_dir, "Uploads")
        self.generated_dir = os.path.join(self.project_dir, "GeneratedCsv")
        
    def _get_file_paths(self, filename):
        """Helper method to generate file paths"""
        return {
            'csv_path': os.path.join(self.uploads_dir, filename),
            'output_path': os.path.join(self.generated_dir, filename)
        }

    def _create_system_messages(self, username, filename, gen_csv_name, df):
        """Create the system messages for the LLM"""
        base_system_prompt = """You are AERO DATA AI, A DATA ANALYST who is EXPERT at writing PYTHON CODE for PANDAS DATAFRAMES AND MODIFYING PANDAS DATAFRAMES.
        Solve tasks using your CODING and LANGUAGE skills.
        1. Generate the relevant code by analyzing the column headers of the dataset.
        2. ALWAYS provide COMPLETE, EXECUTABLE PYTHON CODE (in ```python code blocks) that will work without any modifications.
        
        CRITICAL REQUIREMENTS:
        - Your code MUST ALWAYS end with df.to_csv() to save results
        - Never suggest incomplete code that requires user modification
        - Include only ONE code block per response that can be executed as-is
        - Assume the user can ONLY execute your code without modifications
        - Use a print statement to respond to the user with a message like 'Here is the table for the requested query according to the columns.' Do not print any csv data.  
        """

        return [
            {"role": "system", "content": base_system_prompt},
            {"role": "system", "content": f"The user's name is {username}. Address them by name in your explanations to create a personalized experience."},
            {"role": "system", "content": 'When working with CSV data, ensure proper data type conversion. String columns need appropriate handling.'},
            {"role": "system", "content": 'If asked questions not relevant to the data, politely decline with "I cannot help with that request" and restrict CSV operations to appropriate tasks.'},
            {"role": "system", "content": 'Do not replace variables provided by the user. Assume all referenced variables exist in the dataset.'},
            {"role": "system", "content": f'''THE USER WILL ONLY SEE THE TABLE GENERATED FROM THE CSV FILE NAMED '{gen_csv_name}'. Your code MUST create this file. In your explanation, include: "Here is the table you requested, which contains..." followed by relevant insights about the data.'''},
            {"role": "system", "content": 'ALL CODE MUST BE IN ```python CODE BLOCKS'},
            {"role": "assistant", "content": f'''IMPORTANT: EVERY CODE BLOCK MUST END WITH THIS EXACT LINE: df.to_csv('GeneratedCsv/{gen_csv_name}', index=False) to save the final dataframe.'''},
            {"role": "assistant", "content": f'''Dataset preview:\n{df.columns.values}\nThe complete dataset is located at "Uploads/{filename}". YOUR CODE MUST:
        1. Load this data
        2. Perform the requested analysis/transformation 
        3. Do not modify the file name while saving the csv 
        4. Save the result to "GeneratedCsv/{gen_csv_name}"'''},
            {"role": "assistant", "content": "I am restricted to use print statement in the code for printing any csv data or heads."}
        ]

    def get_response(self, prompt, filename, username, gen_csv_name):
        """Get response from LLM"""
        paths = self._get_file_paths(filename)
        
        try:
            df = pd.read_csv(paths['csv_path'])
            messages = self._create_system_messages(username, filename, gen_csv_name, df)
            messages.append({"role": "user", "content": prompt})
            
            return use_brain(messages=messages, model=coding_model)
        except Exception as e:
            log(f"Error in get_response: {str(e)}")
            raise

    def _handle_successful_execution(self, gen_csv_name, output):
        """Handle successful code execution"""
        if os.path.isfile(os.path.join(self.generated_dir, gen_csv_name)):
            log(f'The file {gen_csv_name} exists in the GeneratedCsv folder.')   
            return gen_csv_name, output
        else:
            log(f"The file {gen_csv_name} does not exist in the GeneratedCsv folder.")
            return "There was an error in generating your requested Table, please try again later. ERROR-TPPY-TTP", None

    def _handle_code_evaluation(self, filename, code, error, gen_csv_name):
        """Handle code evaluation and re-execution"""
        evaluated_output = code_evaluation(filename=filename, generated_code=code, error=error)
        evaluated_code = extract_code(evaluated_output)
        
        new_exit_code, new_code_output = execute_code(evaluated_code)
        
        if new_exit_code == 0:
            return self._handle_successful_execution(gen_csv_name, new_code_output)
        return "There was an error in generating your requested Table, please try again later. ERROR-TPPY-TTP", None

def trigger_table_pipeline(prompt, filename, username):
    """Main entry point for the table pipeline"""
    helper = TablePipelineHelper()
    now = datetime.now()
    gen_csv_name = f'{now.strftime("ADAI_Table_%d_%m_%H_%M_%S")}_{filename}'
    
    try:
        initial_response = helper.get_response(prompt, filename, username, gen_csv_name)
        log('Initial Response has been received')

        code = extract_code(initial_response)
        if code == "NO CODE FOUND":
            log('No code found, regenerating the initial code')
            return trigger_table_pipeline(prompt, filename, username)

        exit_code, initial_output = execute_code(code)
        
        if exit_code == 0:
            log(f'First code generation successful. Initial Code execution output: {exit_code}, {initial_output}')
            if os.path.isfile(os.path.join(helper.generated_dir, gen_csv_name)):
                log(f'The file {gen_csv_name} exists in the GeneratedCsv folder.')
                # Add query suggestions to the output
                enhanced_output = append_suggestions_to_output(initial_output)
                return gen_csv_name, enhanced_output
            else:
                log(f"The file {gen_csv_name} does not exist in the GeneratedCsv folder.")
                return "There was an error in generating your requested Table, please try again later. ERROR-TPPY-TTP", None
        else:
            log("An error occurred while executing the code. Code is being sent back to the LLM for re-evaluation.")
            evaluated_output = code_evaluation(filename=filename, generated_code=code, error=initial_output)
            evaluated_code = extract_code(evaluated_output)
            
            new_exit_code, new_code_output = execute_code(evaluated_code)
            
            if new_exit_code == 0:
                if os.path.isfile(os.path.join(helper.generated_dir, gen_csv_name)):
                    log(f'The file {gen_csv_name} exists in the GeneratedCsv folder.')
                    # Add query suggestions to the output
                    enhanced_output = append_suggestions_to_output(new_code_output)
                    return gen_csv_name, enhanced_output
                else:
                    log(f"The file {gen_csv_name} does not exist in the GeneratedCsv folder.")
                    return "There was an error in generating your requested Table, please try again later. ERROR-TPPY-TTP", None
            else:
                return "There was an error in generating your requested Table, please try again later. ERROR-TPPY-TTP", None
            
    except Exception as e:
        log(f"Error in pipeline: {str(e)}")
        return f"An error occurred: {str(e)}", None