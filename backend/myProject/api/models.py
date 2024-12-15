from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save
from django.core.validators import MinValueValidator
from django.utils.timezone import now
from django.conf import settings

class User(AbstractUser):
    PROGRAM_STUDI_CHOICES = [
        ('Pendidikan Ilmu Komputer', 'Pendidikan Ilmu Komputer'),
        ('Ilmu Komputer', 'Ilmu Komputer'),
        ('Admin', 'Admin'),
    ]
    full_name = models.CharField(max_length=300)
    email = models.EmailField(unique=True)
    nim = models.CharField(max_length=100, unique=True, blank=True, null=True)
    semester = models.IntegerField(validators=[MinValueValidator(1)], blank=True, null=True)
    program_studi = models.CharField(
        max_length=50, choices=PROGRAM_STUDI_CHOICES, blank=True, null=True
    )

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['full_name']

    def __str__(self):
        return self.email

class MahasiswaProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    
    verified = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.full_name} ({self.user.email})"

def create_user_profile(sender, instance, created, **kwargs):
    if created and not hasattr(instance, 'profile'):
        MahasiswaProfile.objects.create(user=instance)

post_save.connect(create_user_profile, sender=User)
