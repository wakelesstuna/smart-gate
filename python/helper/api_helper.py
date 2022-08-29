from fastapi import HTTPException
import requests


_api_key = "1234test"


def verifyApiKey(key: str):
    if key != _api_key:
        raise HTTPException(status_code=403, detail="forbidden")


def send_notification(title: str, message: str):
    requests.post('https://api.mynotifier.app', {
        "apiKey": 'a12b21f0-b9c3-43c8-a159-ea12c73bdf2c',
        "message": title,
        "description": message,
        "type": "info",  # info, error, warning or success
    })
