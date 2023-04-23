from rest_framework import serializers
from .models import Webcam

class WebcamSerializer(serializers.ModelSerializer):
  class Meta:
    model = Webcam
    fields = ["url", "name", "description", "status", "date_added",
              "added_type", "m3u8_address"]
  