import yfinance as yf
import pandas as pd
import matplotlib.pyplot as plt
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import io


app = Flask(__name__)
CORS(app)

def helper_check_stock(symbol: str) -> bool:
    """This function checks if a given stock symbol is valid"""
    stock = yf.Ticker(symbol)

    try:
        info = stock.info           # This will cause error if the stock isn't valid
        return True
    except:
        return False

# Setting the route listener
@app.route('/api/check_stock', methods=['GET'])
def retrieve_stock():
    symbol = request.args.get('symbol')

    # Check if the stock symbol is valid
    valid = helper_check_stock(symbol)

    return jsonify({'symbol': symbol, 'isValid': valid})

@app.route('/api/download_data', methods=['GET'])
def download_stock():
    symbol = request.args.get('symbol')
    period = request.args.get('period')
    interval = request.args.get('interval')

    print(f"Download request recieved: {symbol}, {period}, {interval}")
    if not symbol or not period or not interval:
        return "Missing parameters", 400                    # Bad request
    
    try:
        df = yf.download(symbol, period=period, interval=interval)

        if df.empty:
            return "No data available", 404                 # Not found
        
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

@app.route("/")
def home():
    return "Hello from Flask! Backend is running"

def main():
    """This is for testing purposes"""
    pass

if __name__ == "__main__":
    app.run(debug=True)
    # main()
