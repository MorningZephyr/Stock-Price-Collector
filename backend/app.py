import pandas as pd
import matplotlib.pyplot as plt
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import io
import requests
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Home, Sweet Home
@app.route("/")
def home():
    return "Hello, World! Backend is running"

def helper_check_stock(symbol: str) -> bool:
    """This function checks if a given stock symbol is valid"""

    url = f"https://query1.finance.yahoo.com/v8/finance/chart/{symbol}"
    params = {
        "interval" : "1d",
        "range" : "1d"
    }
    headers = {
       "User-Agent": "Mozilla/5.0" 
    }

    response = requests.get(url, params=params, headers=headers)
    response = response.json()["chart"]["error"]

    if response is not None:
        return False

    return True

# Setting the route listener
@app.route('/api/check_stock', methods=['GET'])
def retrieve_stock():
    symbol = request.args.get('symbol')

    # Check if the stock symbol is valid
    valid = helper_check_stock(symbol)

    return jsonify({'symbol': symbol, 'isValid': valid})

# Downloading the data
@app.route('/api/download_data', methods=['GET'])
def download_stock():
    symbol = request.args.get('symbol')
    period = request.args.get('period')
    interval = request.args.get('interval')

    if not symbol or not period or not interval:
        return "Missing parameters", 400                    # Bad request
    
    try:
        url = f"https://query1.finance.yahoo.com/v8/finance/chart/{symbol}"
        params = {
            "interval": interval,  # e.g., 1d, 1m, etc.
            "range": period        # e.g., 1d, 5d, 1mo, etc.
        }
        headers = {
            "User-Agent": "Mozilla/5.0"  # Important to prevent 403s
        }

        response = requests.get(url, params=params, headers=headers)

        if response.status_code != 200:
            print(f"Error fetching data: {response.status_code}")
            return None
    

        data = response.json()


##########################################################################
        result = data["chart"]["result"][0]

        timestamps = result["timestamp"]
        quotes = result["indicators"]["quote"][0]
        adj_close = result["indicators"].get("adjclose", [None] * len(timestamps))

        if adj_close[0] is not None:
            adj_close = adj_close[0]["adjclose"]

        dates = [datetime.fromtimestamp(ts) for ts in timestamps]

        df = pd.DataFrame({
            "Open" : quotes["open"],
            "High" : quotes["high"],
            "Low" : quotes["low"],
            "Close" : quotes["close"],
            "Adj Close" : adj_close,
            "Volume" : quotes["volume"]
        }, index= pd.to_datetime(dates))

        df.index.name = "Date"

##########################################################################

        
        # A buffer is a temporary area in memory used for facilitate the transfer of data from one place to another
        buffer = io.BytesIO()                 # in-memory string buffer;
        df.to_csv(buffer)
        buffer.seek(0)                         # tell flask to go back to the beginning

        return send_file(
            buffer,
            mimetype='text/csv',               # tells browser it's CSV file
            as_attachment=True,
            download_name=f"{symbol}_data.csv"
        )
        
    except Exception as e:
        return f"Error generating CSV: {str(e)}", 500       # Server error

# Fetching data for viewing in frontend
@app.route('/api/view_data', methods=['GET'])
def fetch_data():
    symbol = request.args.get('symbol')
    period = request.args.get('period')
    interval = request.args.get('interval')

    if not symbol or not period or not interval:
        return "Missing parameters", 400                    # Bad request
    
    try:
        df = yf.download(symbol, period=period, interval=interval)

        if df.empty:
            return jsonify({'error': 'No data available'}), 404

        return df.reset_index().to_json(orient="records")
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500              # Server error

def main():
    """This is for testing purposes"""
    print(helper_check_stock("msft"))
    pass

if __name__ == "__main__":
    app.run(debug=True)
    #main()
