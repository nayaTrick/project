# from fastapi import FastAPI


# app = FastAPI()


# @app.get("/ping")
# def pong():
#     return {"ping": "pong!"}
import json
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

from model.output import predict_lstm


app = FastAPI()


# pydantic models


class StockIn(BaseModel):
    ticker: str


class StockOut(StockIn):
    forecast: dict


# routes


@app.get("/ping")
async def pong():
    return {"ping": "pong!"}


@app.post("/predict", status_code=200)
def get_prediction(payload: StockIn):
    ticker = payload.ticker

    prediction_list = predict_lstm(ticker)

    if not prediction_list:
        raise HTTPException(status_code=400, detail="Model not found.")

    response_object = {"ticker": ticker, "forecast": prediction_list}
    save_json=json.dumps(response_object)
    convert_json=json.loads(save_json)
    # print(type(response_object))
    return convert_json


