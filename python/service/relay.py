import RPi.GPIO as GPIO

def open_gate():
    try:
        GPIO.output(21, GPIO.HIGH)
    finally:
        print("Relay is ON")

def close_gate():
    try:
        GPIO.output(21, GPIO.LOW)
    finally:
        print("Relay is OFF")
