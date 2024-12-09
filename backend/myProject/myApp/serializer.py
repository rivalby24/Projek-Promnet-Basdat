from myApp.models import User, Profile
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'full_name', 'username', 'email', 'nim', 'program_studi', 'semester']


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Adding custom fields from the User model
        token['full_name'] = user.full_name
        token['username'] = user.username
        token['email'] = user.email
        token['nim'] = user.nim
        token['program_studi'] = user.program_studi
        token['semester'] = user.semester
        token['verified'] = getattr(user, 'verified', False)  # Safely handle missing fields

        return token


class RegisterSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['full_name', 'username', 'email', 'nim', 'program_studi', 'semester', 'password', 'password2']

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError({"password": "Passwords do not match"})
        return data

    def create(self, validated_data):
        validated_data.pop('password2')
        user = User.objects.create_user(
            full_name=validated_data['full_name'],
            username=validated_data['username'],
            email=validated_data['email'],
            nim=validated_data['nim'],
            program_studi=validated_data['program_studi'],
            semester=validated_data['semester'],
            password=validated_data['password'],
        )
        return user
