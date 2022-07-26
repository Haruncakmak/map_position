from django.contrib import admin
from .models import Map

class MapAdmin(admin.ModelAdmin):
    list_display = ("date","position")


#Register Model
admin.site.register(Map,MapAdmin)