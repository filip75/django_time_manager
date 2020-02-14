from rest_framework.relations import HyperlinkedRelatedField
from rest_framework.reverse import reverse
from rest_framework.serializers import DurationField

from new_app.models import TimeEntry


class ProjectUserEntryLink(HyperlinkedRelatedField):
    view_name = 'new-app-project-user-entries'
    queryset = TimeEntry.objects.all()

    def get_url(self, obj, view_name, request, format):
        url_kwargs = {'project': obj.project,
                      'user': obj.user}
        return reverse(view_name, kwargs=url_kwargs, request=request, format=format)


class JsonDuration(DurationField):
    def to_representation(self, value):
        days = value.days
        minutes = value.seconds // 60
        hours = minutes // 60
        minutes = minutes % 60

        return {'days': days,
                'hours': hours,
                'minutes': minutes}
