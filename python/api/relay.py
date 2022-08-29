from http.client import OK
from fastapi import APIRouter

from helper.api_helper import send_notification

relay_route = APIRouter()


@relay_route.get("/open", status_code=OK)
async def open_gate():
    msg = "Gate opens up"
   #send_notification(title=msg, message="WJR730 at the gates")
    print(msg)
    return {"message": msg, "open": True}


@relay_route.get("/close", status_code=OK)
async def close_gate():
    msg = "Gate closes"
    print(msg)
    return {"message": msg, "open": False}
