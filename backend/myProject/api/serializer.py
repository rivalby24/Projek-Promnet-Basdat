from api.models import User, MahasiswaProfile, Fakultas, ProgramStudi
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers

class FakultasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fakultas
        fields = ['id', 'nama']
    
class ProgramStudiSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProgramStudi
        fields = ['id', 'fakultas','nama']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'full_name', 'username', 'email', 'role', 'nim', 'program_studi', 'semester']


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add user-related fields to the token
        token['full_name'] = user.full_name
        token['username'] = user.username
        token['email'] = user.email
        token['role'] = user.role
        token['nim'] = user.nim
        # Serialize related fields to avoid non-serializable objects in the token
        token['fakultas'] = user.fakultas.nama
        token['program_studi'] = user.program_studi.nama
        token['semester'] = user.semester
        token['verified'] = getattr(user, 'verified', False)  # Safely handle missing fields

        return token


class RegisterSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['full_name', 'username', 'email', 'role', 'nim', 'fakultas', 'program_studi', 'semester','password', 'password2']

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
            role=validated_data['role'],
            nim=validated_data['nim'],
            fakultas=validated_data['fakultas'],
            program_studi=validated_data['program_studi'],
            semester=validated_data['semester'],
            password=validated_data['password'],
        )
        return user

def to_representation(self, instance):
        representation = super().to_representation(instance)
        
        # Get fakultas and program_studi names, if they are foreign keys
        if instance.fakultas:
            representation['fakultas'] = instance.fakultas.name  # assuming the `name` field holds the name
        if instance.program_studi:
            representation['program_studi'] = instance.program_studi.name  # assuming the `name` field holds the name
        
        return representation