from rest_framework import viewsets
from riwayat.models import RiwayatPendidikan, RiwayatPekerjaan, RiwayatPelatihan
from riwayat.serializer import RiwayatPendidikanSerializer, RiwayatPekerjaanSerializer, RiwayatPelatihanSerializer

class RiwayatPendidikanViewSet(viewsets.ModelViewSet):
    queryset = RiwayatPendidikan.objects.all()
    serializer_class = RiwayatPendidikanSerializer

class RiwayatPekerjaanViewSet(viewsets.ModelViewSet):
    queryset = RiwayatPekerjaan.objects.all()
    serializer_class = RiwayatPekerjaanSerializer

class RiwayatPelatihanViewSet(viewsets.ModelViewSet):
    queryset = RiwayatPelatihan.objects.all()
    serializer_class = RiwayatPelatihanSerializer