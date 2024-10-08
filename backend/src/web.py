from flask import Flask, Response, render_template, request
from flask_cors import CORS, cross_origin
from gpiozero import LED, Button
import RPi.GPIO
from time import sleep

relay = LED(17)
sensor_bottom = Button(12)
sensor_top = Button(13)
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/')
def hello_world():
    relay_state = "OFF"
    if relay.value:
        relay_state = "ON"
    door_state = "Unknown"
    if sensor_top.is_pressed and not sensor_bottom.is_pressed:
        door_state = "Open"
    if sensor_bottom.is_pressed and not sensor_top.is_pressed:
        door_state = "Closed"
    vars = {
        "relay_state": relay_state,
        "door_state": door_state,
    }
    return render_template('main.html', **vars)

@app.route('/output/<state>', methods=["POST"])
def gpio_output(state):
    print("Hit Output")
    if state == "on":
        print("Turning LED on")
        relay.on()
        return Response(status=200)
    elif state == "off":
        print("Turning LED off")
        relay.off()
        return Response(status=200)
    elif state == "blink":
        print("Blinking LED")
        relay.blink(on_time=0.3, n=1)
        return Response(status=200)
    else:
        print(f"Unknown state: {state}")
        return Response(status=500)

@app.route('/input', methods=["GET"])
def gpio_input():
    print("Hit Input")
    door_state = "Unknown"
    if sensor_top.is_pressed and not sensor_bottom.is_pressed:
        door_state = "Open"
    if sensor_bottom.is_pressed and not sensor_top.is_pressed:
        door_state = "Closed"
    response = {
        "sensor_bottom": sensor_bottom.is_pressed,
        "sensor_top": sensor_top.is_pressed,
        "door_state": door_state,
        "relay_state": relay.value,
    }
    return response, 200

@app.route('/input/<sensor>', methods=["GET"])
def gpio_input2(sensor):
    print("Hit Input2")
    door_state = "Unknown"
    if sensor == "sensor_bottom":
        response = {
            "sensor": "sensor_bottom",
            "state": sensor_bottom.is_pressed,
        }
    elif sensor == "sensor_top":
        response = {
            "sensor": "sensor_top",
            "state": sensor_top.is_pressed,
        }
    else:
        return Response(status=404)
    return response, 200

if __name__ == '__main__':
    try:
        app.run()
    except Exception as err:
        print("exiting")
        RPi.GPIO.cleanup()
