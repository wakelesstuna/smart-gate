from http.client import OK
from fastapi import APIRouter
from app.api.models import GateResponse
import app.service.gate_service as gateService
import app.service.notification_service as notificationService


gate_router = APIRouter()


@gate_router.get("/open", status_code=OK, response_model=GateResponse)
async def open_gate_call():
    gateService.open_gate()
   # notificationService.send_notification(title=msg, message="WJR730 at the gates")
    return GateResponse(message="Gate opening...", open=True)


@gate_router.get("/close", status_code=OK, response_model=GateResponse)
async def close_gate_call():
    gateService.close_gate()
    return GateResponse(message="Gate closes...", open=False)
