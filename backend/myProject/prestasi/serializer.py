from rest_framework import serializers
from .models import Prestasi

class PrestasiSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prestasi
        fields = '__all__'
