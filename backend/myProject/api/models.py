from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save
from django.core.validators import MinValueValidator
from django.core.exceptions import ValidationError
from django.utils.timezone import now
from django.conf import settings

class Fakultas(models.Model):
    nama = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.nama

class ProgramStudi(models.Model):
    fakultas = models.ForeignKey(Fakultas, on_delete=models.CASCADE, related_name='program_studi')
    nama = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.nama} ({self.fakultas.nama})"

class User(AbstractUser):
    ROLE_CHOICES = [
        ('Admin', 'Admin'),
        ('Mahasiswa', 'Mahasiswa'),
        ('Alumni', 'Alumni'),
    ]

    full_name = models.CharField(max_length=300)
    email = models.EmailField(unique=True)
    nim = models.CharField(max_length=100, unique=True, blank=True, null=True)
    semester = models.IntegerField(validators=[MinValueValidator(1)], blank=True, null=True)
    fakultas = models.ForeignKey(Fakultas, on_delete=models.SET_NULL, null=True, blank=True, related_name='users')
    program_studi = models.ForeignKey(ProgramStudi, on_delete=models.SET_NULL, null=True, blank=True, related_name='users')
    role = models.CharField(max_length=50, choices=ROLE_CHOICES, default='')
    profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['full_name']

    def __str__(self):
        return self.email

    def clean(self):
        """
        Ensure the selected program_studi belongs to the selected fakultas.
        """
        if self.role == 'mahasiswa' and self.program_studi and self.fakultas and self.program_studi.fakultas != self.fakultas:
            raise ValidationError("Program Studi tidak sesuai dengan Fakultas yang dipilih.")

    @property
    def is_admin(self):
        return self.role == 'admin'

class MahasiswaProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    verified = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.full_name} ({self.user.email})"

def create_user_profile(sender, instance, created, **kwargs):
    if created and not hasattr(instance, 'profile'):
        MahasiswaProfile.objects.create(user=instance)

post_save.connect(create_user_profile, sender=User)
