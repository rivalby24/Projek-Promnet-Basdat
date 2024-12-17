from rest_framework import serializers
from riwayat.models import RiwayatPendidikan, RiwayatPekerjaan, RiwayatPelatihan

class RiwayatPendidikanSerializer(serializers.ModelSerializer):
    class Meta:
        model = RiwayatPendidikan
        fields = '__all__'

class RiwayatPekerjaanSerializer(serializers.ModelSerializer):
    class Meta:
        model = RiwayatPekerjaan
        fields = '__all__'

class RiwayatPelatihanSerializer(serializers.ModelSerializer):
    class Meta:
        model = RiwayatPelatihan
        fields = '__all__'