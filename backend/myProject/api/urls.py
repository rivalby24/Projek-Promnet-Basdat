from rest_framework_simplejwt.views import TokenRefreshView
from django.urls import path
from api import views

urlpatterns = [
    path("token/", views.MyTokenObtainPairView.as_view(), name="token"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("register/", views.RegisterView.as_view(), name="register"),
    path('users/', views.UserListView.as_view(), name='user-list'),
    path('users/<int:pk>/', views.UserUpdateView.as_view(), name='user-update'),
    path("dashboard/", views.dashboard, name="dashboard"),
    path("fakultas/", views.FakultasView.as_view(), name="fakultas"),
    path("fakultas/<int:pk>/", views.FakultasDetailView.as_view(), name="fakultas_detail"),  # Retrieve specific faculty
    path("fakultas/<int:fakultas_id>/programstudi/", views.ProgramStudiByFakultasView.as_view(), name="program_studi"),
    path("fakultas/<int:fakultas_id>/programstudi/<int:pk>/", views.ProgramStudiDetailView.as_view(), name="program_studi_detail"),
    path("", views.getRoutes),
]