import socket
import os
hostname = socket.gethostname()
IPAddr = socket.gethostbyname(hostname)

project_dir = os.getcwd()

# Whether the script will write logs or not
logging = True

# model inference base. can be "openai" or "ollama_url". This inference base will be used across all the agent files to generate outputs
model_inference = "openai"

# open ai api key if the model inference is openai
api_key = ''

# open ai model that will be used to generate the response
openai_model = "gpt-4o"

########################## OLLAMA URL INFERENCE SETTINGS ##########################
ollama_endpoints_url = "http://192.168.10.50:11434/api/chat"
# analytical_model = 'command-r-plus:latest'
# analytical_model = 'llama3:8b-instruct-fp16'
# cot_model="mistral-nemo:12b-instruct-2407-fp16"
cot_model="llama3.3"  



# cot_model="deepseek-r1:8b-llama-distill-fp16"


analytical_model = 'mistral-nemo:12b-instruct-2407-fp16'
# coding_model = 'codegemma:7b-instruct-q8_0'
coding_model = 'mistral-nemo:12b-instruct-2407-fp16'