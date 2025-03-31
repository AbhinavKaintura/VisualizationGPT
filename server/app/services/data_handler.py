import pandas as pd

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
    

    
