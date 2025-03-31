import warnings
warnings.filterwarnings("ignore")

from flask import Flask
from flask_cors import CORS
from app.csv_handler import save_csv, fetch_csv,download_csv
from app.query_handler import agent

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return "Flask is working!"

@app.route('/upload', methods=['POST'])
def upload():
    print("upload route accessed")
    return save_csv()

@app.route('/fetchCsv', methods=['POST'])
def fetchCsv():
    print("fetchCsv route accessed")
    return fetch_csv()

@app.route('/downloadCsv', methods=['GET'])
def download_Csv():
    print("downloadCsv route accessed")
    return download_csv()

@app.route('/query', methods=['POST'])
def query():
    print("query route accessed")
    return agent()


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8000)
