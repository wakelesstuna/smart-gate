from http.client import OK

from fastapi import APIRouter
from python.api.models import GateResponse
from service.notification import send_notification

relay_route = APIRouter()


@relay_route.get("/", status_code=OK, response_model=GateResponse)
async def open_gate():
    msg = "Gate opens up"
   #send_notification(title=msg, message="WJR730 at the gates")
    print(msg)
    return GateResponse(message=msg, open=True)


@relay_route.get("/close", status_code=OK, response_model=GateResponse)
async def close_gate():
    msg = "Gate closes"
    print(msg)
    return GateResponse(message=msg, open=False)
