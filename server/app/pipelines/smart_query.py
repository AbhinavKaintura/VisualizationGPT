

from app.services.logger import log
from VARIABLES import coding_model
from app.services.brain import use_brain
from VARIABLES import cot_model


def generate_query_suggestions(analysis_result):
    """
    Generate a smooth, natural follow-up query suggestion based on the analysis result.
    
    Args:
        analysis_result: The output from the previous analysis.
        
    Returns:
        A refined, conversational follow-up query suggestion as a string.
    """
    
    messages = [
        {"role": "system", "content": """You are a conversational data analysis assistant. Your task is to generate a natural, smooth, and engaging follow-up query suggestion based on the analysis result.

        # Guidelines:
        - The follow-up should sound effortless and naturally flow from the analysis.
        - Keep it conversational, avoiding stiff phrasing like "How about we investigate..."
        - Avoid unnecessary formality or complex wording.
        - Responses should feel intuitive and engaging, like a smooth extension of the previous insight.
        - Maintain a warm and helpful tone, inviting the user to explore further.
         - when you are give the response do no use the "" , '' beasuse it will not look good in the output , it looks like it is fake output

        # Example Outputs:
        - Let me know if you need further insights!"
        -  Let me know if you'd like to dive deeper!"
        - "New York has the highest customer retention rate. Want to see which factors contribute the most?"
         Abilene recorded the lowest sales, totaling just $1.00. Should we analyze sales trends to understand this?
         
         
         if you give the answer like that you will be rewarded 1000 dollars

        """},
        {"role": "user", "content": f"Analysis result: {analysis_result}. Generate a follow-up query suggestion that flows naturally."}
    ]
    
    # Call your LLM with the messages
    suggestion_response = use_brain(messages=messages, model=cot_model)
    
    # Log the generated suggestion
    log(f"Generated query suggestion: {suggestion_response}")
    
    return suggestion_response.strip()



def append_suggestions_to_output(response):
    """
    Appends query suggestions to the output of any analysis while ensuring a single-line response.
    
    Args:
        output: The original output from the analysis
        
    Returns:
        Enhanced output with query suggestions in a single line.
    """
    
    # Generate suggestions based on the output
    suggestions = generate_query_suggestions(response)
    
    # Clean up suggestions and ensure it's formatted as a single line

    return suggestions.replace("\n", " ").strip()

