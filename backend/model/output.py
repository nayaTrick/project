

import tensorflow as tf
# from tensorflow.keras.layers import LSTM, Dense
# from tensorflow.keras.models import Sequential
from tensorflow import keras
from keras.layers import Dense,LSTM
from keras.models import Sequential
import numpy as np
import yfinance as yf
import datetime
TODAY = datetime.date.today()

from sklearn.preprocessing import MinMaxScaler
from keras.models import load_model


def train_lstm(ticker="MSFT"):
    # Fetch stock data using yfinance
    
    data = yf.download(ticker, "2015-01-01", TODAY.strftime("%Y-%m-%d"))
    close_prices = data['Adj Close'].values.reshape(-1, 1)  # Extracting adjusted close prices

    # Normalize data (optional but recommended for LSTM)
    scaler = MinMaxScaler(feature_range=(0, 1))
    close_prices_scaled = scaler.fit_transform(close_prices)

    # Prepare data for LSTM
    X_train, y_train = [], []
    for i in range(100, len(close_prices_scaled)):
        X_train.append(close_prices_scaled[i-100:i, 0])
        y_train.append(close_prices_scaled[i, 0])
    X_train, y_train = np.array(X_train), np.array(y_train)
    X_train = np.reshape(X_train, (X_train.shape[0], X_train.shape[1], 1))  # Reshape for LSTM input

    # Define the LSTM model
    model = Sequential()
    model.add(LSTM(50, return_sequences=True, input_shape=(X_train.shape[1], 1)))
    model.add(LSTM(50, return_sequences=True))
    model.add(LSTM(50))
    model.add(Dense(1))

    # Compile the model
    model.compile(optimizer='adam', loss='mean_squared_error')

    # Train the model
    model.fit(X_train, y_train, epochs=10, batch_size=32)

    # Save the model
    model.save(f"{ticker}_lstm_model.h5")
    print("The model is saved")
    
# def predict_lstm(ticker="MSFT", days=7):
    
    
#     # Load the trained LSTM model
#     model = load_model(f"{ticker}_lstm_model.h5")

#     # Fetch stock data using yfinance
#     data = yf.download(ticker, TODAY.strftime("%Y-%m-%d"), TODAY + datetime.timedelta(days=days))
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
#         day = (TODAY + datetime.timedelta(days=i)).strftime("%m/%d/%Y")
#         output[day] = predictions[-i][0]  # Selecting the predicted price for each day

#     return output
def predict_lstm(ticker="MSFT", days=7, historical_days=200):
    try:
    # Load the trained LSTM model
        model = load_model(f"{ticker}_lstm_model.h5")
        print(type(ticker))

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
    except:
        print(SystemError)
# def convert(prediction_list):
#     output = {}
#     for data in prediction_list:
#         date = data["ds"].strftime("%m/%d/%Y")
#         output[date] = data["trend"]
#     return output


# def convert(prediction_list):
#     output = []
#     for date, trend in prediction_list.items():
#         output.append({"ds": datetime.datetime.strptime(date, "%m/%d/%Y"), "trend": trend})
#     return output



