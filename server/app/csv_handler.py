import os
import pandas as pd
from flask import json, request, jsonify,send_from_directory, abort

UPLOAD_FOLDER = 'Uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

GENERATED_FOLDER = 'GeneratedCsv'
if not os.path.exists(GENERATED_FOLDER):
    os.makedirs(GENERATED_FOLDER)


def save_csv():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    if file and file.filename.endswith('.csv'):
        file_path = os.path.join(UPLOAD_FOLDER,file.filename)
        file.save(file_path)
        return jsonify({'message': 'File successfully uploaded'}), 200
    else:
        return jsonify({'error': 'Invalid file format'}), 400
    
def download_csv():
    # Get the filename from the request arguments
    filename = request.args.get('fileName')
    
    # Ensure filename is provided
    if not filename:
        abort(400, description="Missing 'Gen_Csv_name' parameter")

    # Construct the file path
    file_path = os.path.join("GeneratedCsv", filename)

    # Check if file exists
    if not os.path.isfile(file_path):
        abort(404, description="File not found")

    # Send the file from the directory
    return send_from_directory(directory="GeneratedCsv", path=filename, as_attachment=True)
    

def fetch_csv():
    try:
        # Parse JSON request
        data = request.get_json()

        # Ensure data is a dictionary
        if not isinstance(data, dict):
            return jsonify({'error': 'Expected a JSON object'}), 400
        
        length=300
        startCheck=0
        fileName = data.get('fileName')
        filters = data.get('filters')
        csvRowNumber=data.get('csvRowNumber')
        if(csvRowNumber>290):
            startCheck=10
        print(csvRowNumber)

        if not fileName:
            return jsonify({'error': 'File name is required'}), 400

        filePath = os.path.join(UPLOAD_FOLDER, fileName)

        if not os.path.exists(filePath):
            return jsonify({'error': 'File not found'}), 404

        # Read the CSV file
        df = pd.read_csv(filePath, encoding='utf-8')


        # Initialize unique values list
        uniqueValues = []

        # Separate columns by dtype
        string_columns = df.select_dtypes(include='object').columns
        numeric_columns = df.select_dtypes(include=['number']).columns

        # Handle null values for numeric columns
        df[numeric_columns] = df[numeric_columns].where(pd.notnull(df[numeric_columns]), None)

        # Convert numeric columns to proper numeric types
        for column in numeric_columns:
            df[column] = pd.to_numeric(df[column], errors='coerce')

        # Handle null values for string columns
        df[string_columns] = df[string_columns].fillna("")

        # Collect unique values for each column
        udf = df.fillna("")
        for column in udf.columns:
            unique_vals = udf[column].unique().tolist()
            # Place "" at the beginning if present
            if "" in unique_vals:
                unique_vals = [""] + [val for val in unique_vals if val != ""]
            # Limit the unique values to 100 if there are more
            if len(unique_vals) > 100:
                unique_vals = unique_vals[:100]
            uniqueValues.append({
                "columnName": column,
                "allUniques": unique_vals
            })


        # Apply filters and sorting based on the provided 'filters' variable
        sort_columns = []
        sort_orders = []

        if filters:
            for f in filters:
                name = f.get('name')
                basic = f['filter'].get('basic', '')
                filter_type = f['filter'].get('filterType', '')
                filter_on = f['filter'].get('filterOn', [])
                filter_value = f['filter'].get('filterValue', [])

                if name:
                    try:
                        # Ensure the column exists
                        if name not in df.columns:
                            return jsonify({'error': f'Column {name} does not exist'}), 400

                        if filter_on:
                            df = df[df[name].isin(filter_on)]

                        # Convert column to numeric for numeric comparisons
                        if filter_type in ["Greater Than", "Greater Than Or Equal to", "Less Than", "Less Than Or Equal to", "Between"]:
                            df[name] = pd.to_numeric(df[name], errors='coerce')

                        # Apply filtering based on filterType
                        if filter_type == "Equals":
                            filter_val = filter_value[0]
                            if isinstance(filter_val, (int, float)) or filter_val.isnumeric():
                                df = df[df[name] == float(filter_val)]
                            else:
                                df = df[df[name].astype(str) == filter_val]
                        elif filter_type == "Does Not Equals":
                            filter_val = filter_value[0]
                            if isinstance(filter_val, (int, float)) or filter_val.isnumeric():
                                df = df[df[name] != float(filter_val)]
                            else:
                                df = df[df[name].astype(str) != filter_val]
                        elif filter_type == "Greater Than":
                            filter_val = float(filter_value[0])
                            df = df[df[name] > filter_val]
                        elif filter_type == "Greater Than Or Equal to":
                            filter_val = float(filter_value[0])
                            df = df[df[name] >= filter_val]
                        elif filter_type == "Less Than":
                            filter_val = float(filter_value[0])
                            df = df[df[name] < filter_val]
                        elif filter_type == "Less Than Or Equal to":
                            filter_val = float(filter_value[0])
                            df = df[df[name] <= filter_val]
                        elif filter_type == "Between":
                            if len(filter_value) == 2:
                                low, high = float(filter_value[0]), float(filter_value[1])
                                df = df[df[name].between(low, high)]
                        elif filter_type == "Top":
                            if filter_value and filter_value[0].isdigit():
                                top_n = int(filter_value[0])
                                df = df.nlargest(top_n, name)
                        elif filter_type == "Above Average":
                            avg_value = df[name].mean()
                            df = df[df[name] > avg_value]
                        elif filter_type == "Below Average":
                            avg_value = df[name].mean()
                            df = df[df[name] < avg_value]
                        elif filter_type == "Begins With":
                            df = df[df[name].str.startswith(filter_value[0], na=False)]
                        elif filter_type == "Ends With":
                            df = df[df[name].str.endswith(filter_value[0], na=False)]
                        elif filter_type == "Contains":
                            df = df[df[name].str.contains(filter_value[0], na=False)]
                        elif filter_type == "Does Not Contain":
                            df = df[~df[name].str.contains(filter_value[0], na=False)]

                        # Collect sorting instructions for multiple columns
                        if basic == "Descending to Ascending":
                            sort_columns.append(name)
                            sort_orders.append(False)  # Descending order
                        elif basic == "Ascending to Descending":
                            sort_columns.append(name)
                            sort_orders.append(True)  # Ascending order
                    except Exception as e:
                        print(f'Filtering error for column {name}: {e}')
                        return jsonify({'error': f'Filtering error: {str(e)}'}), 400

        # Reverse sorting criteria if applied
        sort_columns.reverse()
        sort_orders.reverse()

        # Apply sorting across multiple columns if any sorting criteria were specified
        if sort_columns:
            df = df.sort_values(by=sort_columns, ascending=sort_orders)
            
        length=len(df)
        print(length)
        # Get the last 500 rows after filtering and sorting
        if len(df) > 300:
            df = df.iloc[csvRowNumber:csvRowNumber+300+startCheck]
            
        print('sendingData from ',csvRowNumber, 'till',csvRowNumber+300+startCheck)
        # Convert DataFrame to dictionary and replace NaN with empty strings
        if len(df) == 0:
            # If the DataFrame is empty, create a single row with "No-Data"
            no_data_row = {col: "No-Data" for col in df.columns}
            csvdata = [no_data_row]
        else:
            # Replace NaN with empty strings for non-empty DataFrames
            csvdata = df.fillna("").to_dict(orient='records')
            # csvdata = {col: df[col].fillna("").tolist() for col in df.columns}

        return jsonify({"csvdata": csvdata, "uniqueValues": uniqueValues,"length":length}), 200

    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500
    



# this function reads the csv based on the name provided and then returns top 15 rows as json
def extractDataPoints(Gen_Csv_name):
    # Read the CSV file into a DataFrame
    df = pd.read_csv(f'GeneratedCsv/{Gen_Csv_name}') 
    df = df.fillna("")
    
    # If the DataFrame has 30 or fewer rows, return all the data
    if len(df) <= 50:
        json_data = df.to_dict(orient='records')
    else:
        # Otherwise, return the top 30 rows
        json_data = df.head(50).to_dict(orient='records') 
    return json_data

def extractJSON(Gen_JSON_name):
    with open(f'GeneratedJSON/{Gen_JSON_name}', 'r') as file:
        json_data = json.load(file)
        data_points = json_data['data_points']
        graph_type = json_data['graph_type']
    return graph_type,data_points


def extractdfvalue(Gen_Csv_name):
    df = pd.read_csv(f'GeneratedCsv/{Gen_Csv_name}') 
    df = df.head(4)

    extracteddf=df
    


    return extracteddf
