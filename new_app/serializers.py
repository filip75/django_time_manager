from django.contrib.auth.models import User
from rest_framework import serializers

from new_app.fields import ProjectUserEntryLink
from new_app.models import TimeEntry, Project


class UserSerializer(serializers.HyperlinkedModelSerializer):
    projects = serializers.HyperlinkedRelatedField(read_only=True, view_name='new-app-user-projects', source='*',
                                                   lookup_url_kwarg='user')
    worked_time = serializers.DurationField(read_only=True)
    entries = serializers.HyperlinkedRelatedField(read_only=True, view_name='new-app-user-entries', source='*',
                                                  lookup_url_kwarg='user')

    class Meta:
        model = User
        fields = ['url', 'username', 'projects', 'entries', 'worked_time']


class UserOfProject(serializers.HyperlinkedModelSerializer):
    entries = ProjectUserEntryLink(source='*', view_name='new-app-project-user-entries')

    # worked_time = serializers.DurationField(read_only=True)

    class Meta:
        model = User
        fields = ['url', 'username', 'entries']


class ProjectOfUser(serializers.HyperlinkedModelSerializer):
    entries = ProjectUserEntryLink(source='*', view_name='new-app-project-user-entries')

    # worked_time = serializers.DurationField(read_only=True)

    class Meta:
        model = Project
        fields = ['url', 'name', 'description', 'entries']


class ProjectSerializer(serializers.HyperlinkedModelSerializer):
    worked_time = serializers.DurationField(read_only=True)
    users = serializers.HyperlinkedRelatedField(read_only=True, view_name='new-app-project-users', source='*',
                                                lookup_url_kwarg='project')
    entries = serializers.HyperlinkedRelatedField(read_only=True, view_name='new-app-project-entries', source='*',
                                                  lookup_url_kwarg='project')

    class Meta:
        model = Project
        fields = ['url', 'name', 'description', 'worked_time', 'users', 'entries']


class TimeEntrySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = TimeEntry
        fields = ['user', 'project', 'start_time', 'duration']
