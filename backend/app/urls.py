from django.urls import path
from . import views

urlpatterns = [
    path("predict-rent/", views.predict_rent, name="predict_rent"),
    path("csrf-token/", views.csrf_token_view, name="csrf_token"),  # Add this line
]
