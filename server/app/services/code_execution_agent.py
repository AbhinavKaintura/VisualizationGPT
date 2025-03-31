import os
import re
import subprocess
import sys
from typing import Optional, Tuple  
from datetime import datetime

# ignore all warnings
import warnings
warnings.filterwarnings("ignore")

from app.services.logger import log

# declare project path
project_dir = os.getcwd()






# print(project_dir)

def get_python_filename():
    """
    Creates a timestamped python filename
    """
    now = datetime.now()
    python_file_name = f'tmp_{now.strftime("%H_%M_%S")}.py'
    return python_file_name

def extract_code(text: str) -> str:
    """
    Extract code from a string.

    Args:
        text (str): The string from which to extract code.
        
    Returns:
        str: Extracted code, or "NO CODE FOUND" if no code block is found.
    """
    # Try to extract code from Python-specific blocks first
    python_pattern = r'```python([^`]+)```'
    match = re.search(python_pattern, text, flags=re.DOTALL)
    
    if match:
        return match.group(1).strip()
    
    # If no Python-specific block is found, try general code block
    general_pattern = r'```([^`]+)```'
    match = re.search(general_pattern, text, flags=re.DOTALL)
    
    if match:
        return match.group(1).strip().replace("python", "")
    
    return "NO CODE FOUND"


def execute_code(
    code: Optional[str] = None,
    timeout: Optional[int] = None,
    filename: Optional[str] = None,
) -> Tuple[int, str]:
    """
    Execute the given code in a seperate terminal and return the exit code and code output.

    Args:
        code (Optional[str]): The code to execute.
        timeout (Optional[int]): The maximum execution time in seconds.

    Returns:
        Tuple[int, str]: The exit code and the output or error message.
    """
    lang = "python"

    filename = get_python_filename()
    log(f"Temp file has been saved with the name {filename}")


     
    filepath = f'{project_dir}/GeneratedCodes/{filename}'

    if code is not None:
        with open(filepath, "w", encoding="utf-8") as fout:
            fout.write(code)

    cmd = [
        sys.executable if lang.startswith("python") else (lang),
        filepath,
    ]
    with subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True) as proc:
        try:
            stdout, stderr = proc.communicate(timeout=timeout)
            log("Code execution finished, output has been returned")
            return proc.returncode, stdout + stderr
        except subprocess.TimeoutExpired:
            log("Execution timed out.")
            proc.kill()
            return 1, "Execution timed out."