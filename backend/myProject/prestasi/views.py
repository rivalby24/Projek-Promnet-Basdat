from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Prestasi
from .serializer import PrestasiSerializer

@api_view(['GET', 'POST'])
def list_create_prestasi(request):
    if request.method == 'GET':
        riwayat_prestasi = Prestasi.objects.all()
        serializer = PrestasiSerializer(riwayat_prestasi, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = PrestasiSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def retrieve_update_destroy_prestasi(request, pk):
    try:
        prestasi = Prestasi.objects.get(pk=pk)
    except Prestasi.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = PrestasiSerializer(prestasi)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = PrestasiSerializer(prestasi, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        prestasi.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)