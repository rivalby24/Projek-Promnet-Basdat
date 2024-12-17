from django.db import models
from api.models import User

class Prestasi(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='prestasi')
    nama_perlombaan = models.CharField(max_length=100)
    tahun_perlombaan = models.PositiveIntegerField()
    juara_ke = models.PositiveIntegerField()
    tempat_perlombaan = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.nama_perlombaan} - Juara {self.juara_ke} ({self.tahun_perlombaan})"