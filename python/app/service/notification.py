import requests
from env import notify_api_key


def send_notification(title: str, message: str):
    requests.post('https://api.mynotifier.app', {
        "apiKey": notify_api_key,
        "message": title,
        "description": message,
        "type": "info",  # info, error, warning or success
    })
