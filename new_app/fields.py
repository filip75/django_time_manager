from rest_framework.relations import HyperlinkedRelatedField
from rest_framework.reverse import reverse

from new_app.models import TimeEntry


class ProjectUserEntryLink(HyperlinkedRelatedField):
    view_name = 'new-app-project-user-entries'
    queryset = TimeEntry.objects.all()

    def get_url(self, obj, view_name, request, format):
        url_kwargs = {'project': obj.project,
                      'user': obj.user}
        return reverse(view_name, kwargs=url_kwargs, request=request, format=format)
