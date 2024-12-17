from django.urls import path
from . import views

urlpatterns = [
    path('/', views.list_create_prestasi, name='prestasi-list-create'),
    path('/<int:pk>/', views.retrieve_update_destroy_prestasi, name='prestasi-detail'),
]