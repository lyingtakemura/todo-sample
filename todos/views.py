from rest_framework import mixins, viewsets

from todos.serializers import TodoSerializer
from todos.models import Todo


class TodoViewSet(
    viewsets.GenericViewSet,
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin
):
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()
