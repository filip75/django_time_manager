from datetime import timedelta

from django.contrib.auth.models import User
from django.db.models import Sum, F, Value, IntegerField
from django.db.models.functions import Coalesce
from rest_framework import mixins
from rest_framework.generics import ListAPIView, ListCreateAPIView
from rest_framework.viewsets import ModelViewSet, GenericViewSet

from new_app.models import Project, TimeEntry
from new_app.serializers import ProjectSerializer, UserSerializer, UserOfProject, TimeEntrySerializer, ProjectOfUser


class ProjectViewSet(ModelViewSet):
    serializer_class = ProjectSerializer
    queryset = Project.objects.annotate(worked_time=Coalesce(Sum('timeentry__duration'), timedelta())).order_by(
        'id').all()


class ProjectUsersListView(ListAPIView):
    serializer_class = UserOfProject
    queryset = User.objects.all()

    def get_queryset(self):
        return User.objects.filter(timeentry__project__id=self.kwargs['project']).annotate(
            project=Value(self.kwargs.get('project'), IntegerField()),
            user=F('id')).distinct()


class UserViewSet(mixins.RetrieveModelMixin,
                  mixins.ListModelMixin,
                  GenericViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.annotate(worked_time=Coalesce(Sum('timeentry__duration'), timedelta())).all()


class UserProjects(ListAPIView):
    serializer_class = ProjectOfUser
    queryset = Project.objects.all()

    def get_queryset(self):
        return Project.objects.filter(timeentry__user__id=self.kwargs['user']).annotate(
            user=Value(self.kwargs.get('user'), IntegerField()),
            project=F('id')).distinct()


class TimeEntriesListView(ListCreateAPIView):
    queryset = TimeEntry.objects.all()
    serializer_class = TimeEntrySerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        user = self.kwargs.get('user', None)
        if user is not None:
            queryset = queryset.filter(user__id=user)
        project = self.kwargs.get('project', None)
        if project is not None:
            queryset = queryset.filter(project__id=project)
        return queryset
