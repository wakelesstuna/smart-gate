import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)

# Relay 1
GPIO.setup(21, GPIO.OUT)

def open_gate():
    print('Relay 1 ON')
    try:
        GPIO.output(21, GPIO.HIGH)
    finally:
        GPIO.cleanup()

def close_gate():
    print('Relay 1 OFF')
    try:
        GPIO.output(21, GPIO.LOW)
    finally:
        GPIO.cleanup()