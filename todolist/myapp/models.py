from __future__ import unicode_literals
from django.db import models

class TodoItem(models.Model):
    owner = models.CharField(max_length=16,null=True)
    title = models.CharField(max_length=255)
    content = models.CharField(max_length=2047,null=True,blank=True)
    status = models.BooleanField()
    starttime = models.DateField(auto_now_add=True)
    deadline = models.DateField(null=True)
    endtime = models.DateField(null=True)
    priority = models.IntegerField()
