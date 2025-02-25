from django.urls import path
from . import views
from .views import predict_rent, get_predictions

urlpatterns = [
    path("predict_rent/", views.predict_rent, name="predict_rent"),
    path("csrf-token/", views.csrf_token_view, name="csrf_token"),  # Add this line
    path("get_predictions/", get_predictions, name="get_predictions"),
]
