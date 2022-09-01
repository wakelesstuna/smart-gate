#import RPi.GPIO as GPIO

class GPIO():
    BCM = ""
    LOW = ""
    HIGH = ""
    OUT = ""

    def output(arg1, arg2):
        print("output")

    def setmode(arg1):
        print("setmode")

    def setup(arg1, arg2):
        print("setup")

    def cleanup():
        print("cleanup")


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


def init_GPIO():
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(21, GPIO.OUT)
    GPIO.output(21, GPIO.LOW)


def clean_up_GPIO():
    GPIO.cleanup()
