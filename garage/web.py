from flask import Flask, Response, render_template, request
from gpiozero import LED, Button
import RPi.GPIO
from time import sleep

led = LED(17)
door_open = Button(12)
door_closed = Button(13)
app = Flask(__name__)

@app.route('/')
def hello_world():
    led_state = "OFF"
    if led.value:
        led_state = "ON"
    door_state = "Unknown"
    if door_open.is_pressed and not door_closed.is_pressed:
        door_state = "Open"
    if door_closed.is_pressed and not door_open.is_pressed:
        door_state = "Closed"
    vars = {
        "led_state": led_state,
        "door_state": door_state,
    }
    return render_template('main.html', **vars)

@app.route('/output/<state>', methods=["POST"])
def door(state):
    print("Hit door")
    if state == "on":
        print("Turning LED on")
        led.on()
        return Response(status=200)
    elif state == "off":
        print("Turning LED off")
        led.off()
        return Response(status=200)
    elif state == "blink":
        print("Blinking LED")
        led.blink(on_time=0.3, n=1)
        return Response(status=200)
    else:
        print(f"Unknown state: {state}")
        return Response(status=500)

if __name__ == '__main__':
    try:
        app.run(host="0.0.0.0", port="5000")
    except Exception as err:
        print("exiting")
        RPi.GPIO.cleanup()