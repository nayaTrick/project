
# from tensorflow.keras.models import load_model
from tensorflow import keras
# from keras.layers import Dense,LSTM
from keras.models import load_model
import numpy as np
import yfinance as yf
import datetime
from sklearn.preprocessing import MinMaxScaler
TODAY = datetime.date.today()



# def predict_lstm(ticker="MSFT", days=7):
#     today_date = datetime.date.today()
#     date_string = today_date.strftime("%Y-%m-%d")
#     # Load the trained LSTM model
#     model = load_model(f"{ticker}_lstm_model.h5")

#     # Fetch stock data using yfinance
#     data = yf.download(ticker, date_string, date_string + datetime.timedelta(days=days))
#     close_prices = data['Adj Close'].values.reshape(-1, 1)  # Extracting adjusted close prices

#     # Normalize data (using the same scaler as during training)
#     scaler = MinMaxScaler(feature_range=(0, 1))
#     close_prices_scaled = scaler.fit_transform(close_prices)

#     # Prepare data for prediction
#     X_pred = []
#     for i in range(100, len(close_prices_scaled)):
#         X_pred.append(close_prices_scaled[i-100:i, 0])
#     X_pred = np.array(X_pred)
#     X_pred = np.reshape(X_pred, (X_pred.shape[0], X_pred.shape[1], 1))  # Reshape for LSTM input

#     # Make predictions
#     predictions_scaled = model.predict(X_pred)

#     # Inverse transform predictions to get actual stock prices
#     predictions = scaler.inverse_transform(predictions_scaled)

#     # Prepare output dictionary
#     output = {}
#     for i in range(1, days+1):
#         day = (date_string + datetime.timedelta(days=i)).strftime("%m/%d/%Y")
#         output[day] = predictions[-i][0]  # Selecting the predicted price for each day

#     return output
# def predict_lstm(ticker="MSFT", days=7):
    
    
#     # Load the trained LSTM model
#     model = load_model(f"{ticker}_lstm_model.h5")

#     # Fetch stock data using yfinance
#     data = yf.download(ticker, TODAY.strftime("%Y-%m-%d"), TODAY + datetime.timedelta(days=days))
#     close_prices = data['Adj Close'].values.reshape(-1, 1)  # Extracting adjusted close prices

#     # Normalize data (using the same scaler as during training)
#     scaler = MinMaxScaler(feature_range=(0, 1))
#     close_prices_scaled = scaler.fit_transform(close_prices)
    
#     # Ensure enough data points for LSTM input
#     if len(close_prices_scaled) < 100:
#         raise ValueError("Insufficient data points for prediction")

#     # Prepare data for prediction
#     X_pred = []
#     for i in range(100, len(close_prices_scaled)):
#         X_pred.append(close_prices_scaled[i-100:i, 0])
#     X_pred = np.array(X_pred)
#     X_pred = np.reshape(X_pred, (X_pred.shape[0], X_pred.shape[1], 1))  # Reshape for LSTM input
    
#     # Make predictions
#     predictions_scaled = model.predict(X_pred)

#     # Inverse transform predictions to get actual stock prices
#     predictions = scaler.inverse_transform(predictions_scaled)

#     # Prepare output dictionary
#     output = {}
#     for i in range(1, days+1):
#         day = (TODAY + datetime.timedelta(days=i)).strftime("%m/%d/%Y")
#         output[day] = predictions[-i][0]  # Selecting the predicted price for each day

#     return output

def predict_lstm(ticker="MSFT", days=7, historical_days=200):
    # Load the trained LSTM model
    model = load_model(f"{ticker}_lstm_model.h5")

    # Fetch stock data using yfinance
    start_date = TODAY - datetime.timedelta(days=historical_days)
    data = yf.download(ticker, start=start_date.strftime("%Y-%m-%d"), end=TODAY.strftime("%Y-%m-%d"))
    close_prices = data['Adj Close'].values.reshape(-1, 1)  # Extracting adjusted close prices

    # Normalize data (using the same scaler as during training)
    scaler = MinMaxScaler(feature_range=(0, 1))
    close_prices_scaled = scaler.fit_transform(close_prices)

    # Ensure enough data points for LSTM input
    if len(close_prices_scaled) < 100:
        raise ValueError("Insufficient data points for prediction")

    # Prepare data for prediction
    X_pred = []
    for i in range(100, len(close_prices_scaled)):
        X_pred.append(close_prices_scaled[i-100:i, 0])
    X_pred = np.array(X_pred)
    X_pred = np.reshape(X_pred, (X_pred.shape[0], X_pred.shape[1], 1))  # Reshape for LSTM input
    
    # Make predictions
    predictions_scaled = model.predict(X_pred)

    # Inverse transform predictions to get actual stock prices
    predictions = scaler.inverse_transform(predictions_scaled)

    # Prepare output dictionary
    output = {}
    for i in range(1, days+1):
        day = (TODAY + datetime.timedelta(days=i)).strftime("%m/%d/%Y")
        output[day] = predictions[-i][0]  # Selecting the predicted price for each day

    return output
