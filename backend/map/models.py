from django.db import models

class Map(models.Model):
    date=models.CharField(max_length=120)
    position=models.CharField(max_length=120)
    
    
def __str__(self):
    return self.position
