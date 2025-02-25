start cmd /k "python manage.py runserver 0.0.0.0:8000"
timeout /t 10 >nul
start ngrok http --domain=prompt-friendly-longhorn.ngrok-free.app 8000