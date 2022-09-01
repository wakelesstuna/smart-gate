from http.client import OK
from fastapi import APIRouter
from app.api.models import GateResponse
from app.service.relay import open_gate, close_gate

from app.service.notification import send_notification

relay = APIRouter()


@relay.get("/open", status_code=OK, response_model=GateResponse)
async def open_gate_call():
    open_gate()
    msg = "Gate opens up"
   #send_notification(title=msg, message="WJR730 at the gates")
    print(msg)
    return GateResponse(message=msg, open=True)


@relay.get("/close", status_code=OK, response_model=GateResponse)
async def close_gate_call():
    close_gate()
    msg = "Gate closes"
    print(msg)
    return GateResponse(message=msg, open=False)
