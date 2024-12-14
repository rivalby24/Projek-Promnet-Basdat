from django.contrib import admin
from api.models import User, MahasiswaProfile
# Register your models here.
class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'email']

class MahasiswaProfileAdmin(admin.ModelAdmin):
    list_editable = ['verified']
    list_display = ['user', 'verified']

admin.site.register(User, UserAdmin)
admin.site.register(MahasiswaProfile, MahasiswaProfileAdmin)