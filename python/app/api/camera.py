import imp
from pkgutil import ImpImporter
from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse

camera = APIRouter()


@camera.get("/stream")
def stream_video():
    file_path = "/python/sample.mp4"

    def iterfile():
        with open(file_path, mode="rb") as file:
            yield from file

    return StreamingResponse(iterfile(), media_type="video/mp4")
