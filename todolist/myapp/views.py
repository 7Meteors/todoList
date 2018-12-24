from django.shortcuts import render
from django.http import JsonResponse
from myapp.models import TodoItem

# Create your views here.
def index(request):
    return render(request, 'index.html')

def apis(request):
    data = {}
    data['name'] = "asd"
    data['age'] = "qwe"

    return JsonResponse(data)