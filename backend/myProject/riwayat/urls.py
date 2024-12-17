from django.urls import path
from . import views

urlpatterns = [
    # URL untuk Riwayat Pendidikan
    path("pendidikan/", views.RiwayatPendidikanViewSet.as_view({'get': 'list', 'post': 'create'}), name="riwayat-pendidikan"),
    path("pendidikan/<int:pk>/", views.RiwayatPendidikanViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name="riwayat-pendidikan-detail"),

    # URL untuk Riwayat Pekerjaan
    path("pekerjaan/", views.RiwayatPekerjaanViewSet.as_view({'get': 'list', 'post': 'create'}), name="riwayat-pekerjaan"),
    path("pekerjaan/<int:pk>/", views.RiwayatPekerjaanViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name="riwayat-pekerjaan-detail"),

    # URL untuk Riwayat Prestasi
    path("prestasi/", views.RiwayatPrestasiViewSet.as_view({'get': 'list', 'post': 'create'}), name="riwayat-prestasi"),
    path("prestasi/<int:pk>/", views.RiwayatPrestasiViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name="riwayat-prestasi-detail"),

    # URL untuk Riwayat Pelatihan
    path("pelatihan/", views.RiwayatPelatihanViewSet.as_view({'get': 'list', 'post': 'create'}), name="riwayat-pelatihan"),
    path("pelatihan/<int:pk>/", views.RiwayatPelatihanViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name="riwayat-pelatihan-detail"),
]