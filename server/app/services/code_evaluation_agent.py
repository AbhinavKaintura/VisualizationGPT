import pandas as pd
import os
# ignore all warnings
import warnings
warnings.filterwarnings("ignore")

from app.services.logger import log
from VARIABLES import coding_model
from app.services.brain import use_brain
project_dir = os.getcwd()


def code_evaluation(fileName , generated_code, error):
    """
    Evaluates incorrect code generated by the LLM in initial run

    Args:
        csv_file: User's csv file path which contains the data.
        generated_code: Incorrect code that needs correction.
        error: Error encountered on execution of the incorrect code.
        
    Returns:
        Evaluated/Corrected Code
    """
    log("\033[93mStarting code re-evaluation\033[0m")
    
    df = pd.read_csv(os.path.join('Uploads', fileName))
    prompt = f'''These are my dataset's columns:\n{df.columns.values}\nThis is python code:\n{generated_code}\nThis is the error:\n{error}'''

    log(f'compiled prompt for re-evaluation:\n{prompt}')

    final_prompt = f'{prompt}\nCorrect this python code and return the new Python code'

    messages=[
        {"role": "system", "content": '''#You are AERO DATA AI, A DATA ANALYST who is an EXPERT at CORRECTING PYTHON CODE for PANDAS DATAFRAMES.#
         Your user has ran into an error.
         The user will provide you DATASET, PYTHON CODE AND THE ERROR ENCOUNTERED.
         Your task is to take the given DATASET, PYTHON CODE AND ERROR IN ACCOUNT AND RETURN NEW PYTHON CODE (in PYTHON CODING BLOCKS: ```python) for the user to EXECUTE.
         The user can't modify your code. So do not suggest incomplete code which requires users to modify.
         DO NOT INCLUDE MULTIPLE CODE BLOCKS IN ONE RESPONSE. Do not ask users to copy and paste anything. Instead, use 'print' function when relevant.
         Suggest the full code instead of partial code or code changes.'''},

        {"role": "system", "content": '''MAKE SURE TO CHECK THE GIVEN CODE FOR SPELLING ERRORS. SOMETIMES THE CODE MAY CONTAIN SMALL ERRORS LIKE MISSING SPACES OR CAPITALISATION ERRORS
         MAKE SURE TO CONVERT THE COLUMNS TO THE CORRESPONDING DATA TYPES. EXAMPLE: CONVERTING DATE NAMED COLUMNS TO DATETIME DATA TYPES INSTEAD OF OBJECT DATA TYPES
         MAKE SURE YOU WRITE THE NEW CODE COMPLETELY. DO NOT RETURN ONLY THESPECIFIC PORTIONS OF THE CODE INSTEAD RETURN THE COMPLETE CORRECTED CODE FOR THE USER TO EXECUTE
         Suggest the full code instead of partial code or code changes'''},

        {"role": "user", "content": final_prompt}
        ]
    
    response = use_brain(messages=messages , model=coding_model)
    
    log('Code re-evaluation complete')
    
    return response