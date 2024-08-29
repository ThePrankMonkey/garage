# Garage

## Problem

I need to remotely open my garage so my kids can take their bikes in and out and I don't want them losing my garage door opener.

## Solution

I'm going to wire a relay into the garage door opener and contorl it with a webserver.

## Research

![official garage door wiring](./garagedoor_wiring.png) shows that the opener button only needs to bridge ports 3 and 4.

## Design

![breadboard model](Garage_bb.png)

### Bill of Materials

_Coming_

## Future Plans

- v1
  - Relay to act as garage door button
  - Magnetic Door Sensor to report door is closed
  - Magnetic Door Sensor to report door is opened
  - Basic Flask website
- v2
  - Authentication
- v3
  - Web camera feed on page
- v4
  - Move to FastAPI backend
- v5
  - Move to React Native frontend and android app
- v6
  - Design and order a custom HAT PCB

## Issues

### Poetry hangs on install/add

There's something weird going on with Poetry and we need to disable keyrings to get it to not hang.

```bash
export PYTHON_KEYRING_BACKEND=keyring.backends.null.Keyring
```

or

```bash
python3 -m keyring --disable
```

- https://github.com/python-poetry/poetry/issues/1917#issuecomment-1251667047

### GPIO busy

```
lgpio.error: 'GPIO busy'
```

You can't run Flask in Debug mode with GPIO. At least not Buttons. Something to do with multithreading.

- https://forums.raspberrypi.com/viewtopic.php?t=362014&start=25

### Form Submit redirects

I don't want the page to change when the button (forms) are clicked.

So I need to make a dummy iframes and point the forms to reload them.

- https://stackoverflow.com/questions/25983603/how-to-submit-an-html-form-without-redirection

## References

- [Example - ismartgate](https://ismartgate.com/smart-garage-door-opener-for-genie-reliag-850/), has a nice wiring diagram that shows where to connect my relay.
- [Example - JoeHeyming](https://imgur.com/a/i-used-raspberry-pi-to-hack-garage-door-opener-q4OqKBp), this uses a door opener that is wired onto.
- [Documentation - Garage Manual](https://landmarkgaragedoors.com/wp-content/uploads/2014/08/reliag-850-650_operation-maintenance-manual_08-131.pdf)
- [Documentation - gpiozero](https://gpiozero.readthedocs.io/en/stable/index.html)
- [Documentation - rpi-lgpio](https://rpi-lgpio.readthedocs.io/en/release-0.4/index.html)