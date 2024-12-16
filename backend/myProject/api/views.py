from django.shortcuts import render
from api.models import MahasiswaProfile, User, Fakultas, ProgramStudi
from api.serializer import UserSerializer, MyTokenObtainPairSerializer, RegisterSerializer, FakultasSerializer, ProgramStudiSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics, status, serializers
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView
from rest_framework.exceptions import NotFound

# Token View for JWT Authentication
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

# Register View for new users
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

# Fakultas View for listing all Fakultas and creating new Fakultas
class FakultasView(generics.ListCreateAPIView):  # Changed to ListCreateAPIView
    queryset = Fakultas.objects.all()
    serializer_class = FakultasSerializer

# Fakultas Detail View for fetching details of a specific Fakultas
class FakultasDetailView(RetrieveAPIView):
    queryset = Fakultas.objects.all()
    serializer_class = FakultasSerializer

# Program Studi View based on Fakultas, now using ListCreateAPIView to create new Program Studi
class ProgramStudiByFakultasView(generics.ListCreateAPIView):  # Changed to ListCreateAPIView
    serializer_class = ProgramStudiSerializer
    
    def get_queryset(self):
        fakultas_id = self.kwargs['fakultas_id']
        try:
            # Filter Program Studi by Fakultas ID
            queryset = ProgramStudi.objects.filter(fakultas_id=fakultas_id)
            return queryset
        except ProgramStudi.DoesNotExist:
            raise NotFound("Program Studi tidak ditemukan untuk fakultas ini.")

    def perform_create(self, serializer):
        fakultas = Fakultas.objects.get(id=self.kwargs['fakultas_id'])  # Get Fakultas from ID
        serializer.save(fakultas=fakultas)  # Save Program Studi with the selected Fakultas

# Program Studi Detail View for fetching details of a specific Program Studi
class ProgramStudiDetailView(RetrieveAPIView):
    queryset = ProgramStudi.objects.all()
    serializer_class = ProgramStudiSerializer

# Dashboard view, protected by authentication
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def dashboard(request):
    if request.method == "GET":
        response = f"Selamat datang kembali, {request.user.full_name}"
        return Response({'response': response}, status=status.HTTP_200_OK)
    elif request.method == "POST":
        response = f"Selamat datang kembali, {request.user.full_name}"
        return Response({'response': response}, status=status.HTTP_200_OK)
    
    return Response({}, status=status.HTTP_400_BAD_REQUEST)

# A function to import urls if necessary (not typically needed in views)
def some_function():
    from api import urls  # Hanya impor saat dibutuhkan

# Routes view for listing available API routes
@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/login/',
        '/api/register/',
        '/api/dashboard/',
        '/api/fakultas/',
        '/api/fakultas/<int:fakultas_id>/programstudi/',  # Endpoint for Program Studi by Fakultas
    ]
    return Response(routes)
