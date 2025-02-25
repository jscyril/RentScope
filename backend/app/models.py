from django.db import models

class Prediction(models.Model):
    locality = models.CharField(max_length=255)
    area = models.FloatField()
    bedroom = models.IntegerField()
    bathroom = models.IntegerField()
    furnish_type = models.CharField(max_length=50)
    seller_type = models.CharField(max_length=50)
    layout_type = models.CharField(max_length=50)
    property_type = models.CharField(max_length=50)
    predicted_rent = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Prediction: {self.locality} - {self.predicted_rent}"
