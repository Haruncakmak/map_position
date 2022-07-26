from django.shortcuts import render

from rest_framework import viewsets
from .serializers import MapSerializer
from .models import Map


class MapView(viewsets.ModelViewSet):
    serializer_class = MapSerializer
    queryset = Map.objects.all()
