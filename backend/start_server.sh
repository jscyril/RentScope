#!/bin/bash

# Start Django server in the background
python manage.py runserver 0.0.0.0:8000 &

# Wait for a few seconds to ensure the server starts
sleep 10

# Start ngrok to expose port 8000
ngrok http --domain=prompt-friendly-longhorn.ngrok-free.app 8000
