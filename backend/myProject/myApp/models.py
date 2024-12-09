from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save
from django.core.validators import MinValueValidator
# Create your models here.

class User(AbstractUser):
    PROGRAM_STUDI_CHOICES = [
        ('Pendidikan Ilmu Komputer', 'Pendidikan Ilmu Komputer'),
        ('Ilmu Komputer', 'Ilmu Komputer'),
    ]
    full_name = models.CharField(max_length=300)
    username = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    nim = models.CharField(max_length=100, unique=True, default='nim')
    semester = models.IntegerField(validators=[MinValueValidator(1)], blank=True, null=True)
    program_studi = models.CharField(
        max_length=50, choices=PROGRAM_STUDI_CHOICES
    )
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.username
    
class Profile(models.Model):
    PROGRAM_STUDI_CHOICES = [
        ('Pendidikan Ilmu Komputer', 'Pendidikan Ilmu Komputer'),
        ('Ilmu Komputer', 'Ilmu Komputer'),
    ]
    user = models.OneToOneField(User, on_delete=models.CASCADE)  # Hubungan ke User
    nim = models.CharField(max_length=100, unique=True, default='nim')
    semester = models.IntegerField(validators=[MinValueValidator(1)], blank=True, null=True)
    full_name = models.CharField(max_length=300)
    verified = models.BooleanField(default=False)
    program_studi = models.CharField(
        max_length=50, choices=PROGRAM_STUDI_CHOICES
    )
    
    def __str__(self):
        return f"{self.full_name} ({self.user.email})"
    
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance, nim=f"default_{instance.id}")

def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()

post_save.connect(create_user_profile, sender=User)
post_save.connect(save_user_profile, sender=User)