# from fastapi import FastAPI


# app = FastAPI()


# @app.get("/ping")
# def pong():
#     return {"ping": "pong!"}


import json
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from model.output import predict_lstm

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this based on your frontend's URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# pydantic models
class StockIn(BaseModel):
    ticker: str

class StockOut(StockIn):
    forecast: dict

# routes
@app.get("/ping")
async def pong():
    return {"ping": "pong!"}

@app.get("/predict", response_model=StockOut, status_code=200)
def get_prediction(stockSymbol:str):
    prediction_dict = predict_lstm(stockSymbol)

    if not prediction_dict:
        raise HTTPException(status_code=400, detail="Model not found.")
    prediction_list = {date:float(value) for date,value in prediction_dict.items()}
    response_object = {"ticker": stockSymbol, "forecast": prediction_list}
    return response_object


# pydantic models


class StockIn(BaseModel):
    ticker: str


class StockOut(StockIn):
    forecast: dict


# routes


@app.get("/ping")
async def pong():
    return {"ping": "pong!"}


@app.get("/predict",response_model=StockOut,status_code=200)
def get_prediction(stockSymbol:str):
    
    prediction_dict = predict_lstm(stockSymbol)

    if not prediction_dict:
        raise HTTPException(status_code=400, detail="Model not found.")
    prediction_list={date:float(value) for date,value in prediction_dict.items()}
    

    response_object = {"ticker": stockSymbol, "forecast": prediction_list}
   
    return response_object


