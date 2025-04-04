# Stock Price Collector - Terminal Version
This is a terminal version of the application, without the frontend. Install the required libraries and the program can be runned!

## List of functions
- get_stock(): 
This function prompts the user for a stock ticker symbol; such as MSFT (Microsoft), AAPL (Apple), and AMZN (Amazon); and returns a yfinance.Ticker object, which will be used later for data collection. The function uses a try and except method to ensure that the user enters a valid symbol. To see if a given symbol is invalid, it is observed that a KeyError will be raised when invoking ticker_object.info['currentPrice'] for invalid yfinance.Ticker objects. The code will catch that error when encountered and prompt the user to re-enter.

- get_file_name(): 
This function gets a valid file name for the data file to be exported. First, the user will be given the choices between 1. csv or 2. xlsx format. To ensure that the user selects between the two choices, conditional statements and while loops are set to ensure valid input. Next is the file name, which can only contain alphanumeric characters. Regular expressions and while loops were used to help with this task. The user has the option to enter the file extension (.csv or .xlsx), so the regular expression took that into consideration. However, the file extension must match the format chosen in the beginning of the function, or else it'll be invalid, and the user will have to re-enter the file name. 

- customizer(stock: yf.Ticker): 
This function allows users to configure how far back and at what time interval the stock prices should be collected. yfinance.Ticker object has a .history() method which fetches past stock prices, and the 2 parameters of that method that were used were interval and period. yfinance has different interval options for different periods, so a 2-D array design was chosen for the implementation. The row indices correspond to different periods, and the elements in each row indicate the available time intervals. To ensure that the users select within the range of choices, a try and except method was used. Options that fall outside the range will raise an IndexError, and options that are non-numeric will raise a ValueError. When the user enters acceptable choices, those values will then be passed to the interval and period parameter of the history method, and the function will return a pandas.DataFrame object containing the customized data.

- export_data(file: pd.DataFrame): 
This function utilizes the .to_csv() and .to_excel() methods from the pandas.DataFrame class to convert the DataFrame object and export it to current directory. A note on excel files is that they don't take files with dates that are timezone aware, in which those from the DataFrame index are. To solve this, the index was first configured to timezone unaware via tz_localize(None), then the export may proceed. A message will be printed to confirm the download. 

- print_graph(file: pd.DataFrame, name: str): 
This function ultilizes the matplotlib library to plot the stock price data. The x-axis is set to the index of the pd.DataFrame object, which is the time. The y-axis is set to the closing price of the stock at the end of its interval.
