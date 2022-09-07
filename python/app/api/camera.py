from fastapi import APIRouter
from fastapi.responses import StreamingResponse

camera_router = APIRouter()


@camera_router.get("/stream")
def stream_video():
    file_path = "D:\projects\smart-gate\python\sample.mp4"

    def iterfile():
        with open(file_path, mode="rb") as file:
            yield from file

    return StreamingResponse(iterfile(), media_type="video/mp4")
