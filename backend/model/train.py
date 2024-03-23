import tensorflow as tf
# from tensorflow.keras.layers import LSTM, Dense
# from tensorflow.keras.models import Sequential
from tensorflow import keras
from keras.layers import Dense,LSTM
from keras.models import Sequential
import numpy as np
import yfinance as yf
from datetime import date
from sklearn.preprocessing import MinMaxScaler


def train_lstm(ticker="MSFT"):
    # Fetch stock data using yfinance
    today_date = date.today()
    date_string = today_date.strftime("%Y-%m-%d")
    data = yf.download(ticker, "2020-01-01", date_string)
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
