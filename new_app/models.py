from datetime import datetime, timedelta

from django.contrib.auth.models import User
from django.db import models

PROJECT_DELETED = 'PROJECT DELETED'


class Project(models.Model):
    name = models.CharField(max_length=100, null=False, blank=False, unique=True)
    description = models.CharField(max_length=1000, blank=True)

    def __str__(self):
        return self.name


def get_deleted_project():
    return Project.objects.get_or_create(name=PROJECT_DELETED)[0].id


class TimeEntry(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
    project = models.ForeignKey(Project, on_delete=models.SET(get_deleted_project), null=False)
    start_time = models.DateTimeField(null=False)
    duration = models.DurationField(blank=True, default=timedelta)

    @property
    def actual_duration(self):
        if self.duration:
            return self.duration
        return datetime.now() - self.start_time

    @property
    def in_progress(self):
        return self.duration == timedelta()

    def __str__(self):
        return f'user={self.user.username}, project={self.project.name}, in_progress={self.in_progress}, ' \
               f'duration=({self.duration})'
