import pandas as pd
import os

# ignore all warnings
import warnings
warnings.filterwarnings("ignore")


from VARIABLES import analytical_model
from app.services.brain import use_brain
from app.pipelines.smart_query import append_suggestions_to_output
project_dir = os.getcwd()


def trigger_summary_pipeline(prompt,fileName,userName):
    """
    Fetch summary of the dataset from the LLM

    Args:
        csv_file: User's csv file which contains the data.
        prompt: User's prompt for the LLM.
        
    Returns:
        JSON containing the summary of the dataset
    """

    df = pd.read_csv(os.path.join('Uploads', fileName))
    data_types = df.dtypes.value_counts()
    data_shape = df.shape
    data_description = df.describe(include='all')
    null_values = df.isnull().sum()
    
    base_system_prompt = """You are  Insights AI, an expert data analyst and summariser. The user has a dataset. The whole dataset cannot be shared with you but you can take a look at some key details of the dataset. Your task is to take all the key details under consideration and generate a summary of the dataset that the user will read.
    Before creating the summary, remember that the user cannot provide any other feedback or perform any other action beyond reading your summary, do not suggest anything else than the summary.
    """
    messages = [
    {"role": "system", "content": base_system_prompt},
    {
    "role": "system", 
    "content": f"The user's name is {userName}. Please incorporate the user's name into your explanations where appropriate to create a more personalized and engaging response."
    },
    {"role": "system", "content": f'''Use these details generated from the dataset to generate the summary:
     The glimpse of the dataframe:
     {df}
     The types of the data:
     {data_types}
     The shape of the data:
     {data_shape}
     The description of the data:
     {data_description}
     The null values of the data:
     {null_values}
     Now generate a detailed summary of the dataset. The generated summary can include exploratory data analyses and key takeaways from the dataset.'''},
    {"role": "user", "content": 'Now Create a summary based on the information given above and In your response do not use sentences like "according to your data".'},
    ]

    response = use_brain(messages=messages, model=analytical_model)


    enhanced_response = append_suggestions_to_output(response)
    return(f'{response}{enhanced_response}')
    




 