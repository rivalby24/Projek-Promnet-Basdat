from django.db import models
from api.models import User
# Create your models here.
class RiwayatPendidikan(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='riwayat_pendidikan')
    nama_pendidikan = models.CharField(max_length=100)
    institusi = models.CharField(max_length=100)
    tanggal_mulai = models.DateField()
    tanggal_selesai = models.DateField(null=True, blank=True)  # Bisa kosong jika masih dalam proses
    gelar = models.CharField(max_length=50, null=True, blank=True)

    def __str__(self):
        return f"{self.nama_pendidikan} di {self.institusi}"

class RiwayatPekerjaan(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='riwayat_pekerjaan')
    nama_perusahaan = models.CharField(max_length=100)
    posisi = models.CharField(max_length=100)
    tanggal_mulai = models.DateField()
    tanggal_selesai = models.DateField(null=True, blank=True)  # Bisa kosong jika masih bekerja
    deskripsi = models.TextField(blank=True)

    def __str__(self):
        return f"{self.posisi} di {self.nama_perusahaan}"

class RiwayatPelatihan(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='riwayat_pelatihan')
    nama_pelatihan = models.CharField(max_length=100)
    tahun_pelatihan = models.PositiveIntegerField()
    lembaga = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.nama_pelatihan} ({self.tahun_pelatihan})"

