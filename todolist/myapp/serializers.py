from .models import TodoItem
from rest_framework import serializers


class TodoItemSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = TodoItem
        fields = ('id', 'owner', 'title', 'content', 'status', 'starttime', 'deadline', 'endtime', 'priority')
