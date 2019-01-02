from myapp.models import TodoItem
from rest_framework import viewsets
from myapp.serializers import TodoItemSerializer
from rest_framework.pagination import PageNumberPagination
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    page__size_query_param = 'page_size'
    page_query_param = 'page'
    max_page_size = 100


class TodoItemViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = TodoItem.objects.all()
    serializer_class = TodoItemSerializer
    pagination_class = StandardResultsSetPagination
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    ordering_fields = ('id', 'title', 'starttime', 'deadline', 'status', 'priority')
    ordering = ('id',)
