from fastapi import HTTPException
from env import api_key


def verifyApiKey(key: str):
    if key != api_key:
        raise HTTPException(status_code=403, detail="forbidden")
