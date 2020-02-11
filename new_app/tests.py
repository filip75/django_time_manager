import datetime

from django.contrib.auth.models import User
from django.test import TestCase
from freezegun import freeze_time

from new_app.models import Project, TimeEntry


class TestModels(TestCase):
    def test_project_str(self):
        project = Project.objects.create(name='project', description='description')

        self.assertEqual('project', str(project))


class TestTimeEntry(TestCase):
    def setUp(self) -> None:
        self.user = User.objects.create(username='user')
        self.project = Project.objects.create(name='project', description='description')

    def test_str(self):
        entry = TimeEntry.objects.create(user=self.user, project=self.project,
                                         start_time=datetime.datetime(year=2020, month=1, day=1),
                                         duration=datetime.timedelta(hours=12, minutes=12, seconds=13))

        self.assertEqual(
            f'user=user, project=project, in_progress=False, duration=(12:12:13)', str(entry))

    def test_duration_of_unfinished_entry(self):
        entry = TimeEntry.objects.create(user=self.user, project=self.project,
                                         start_time=datetime.datetime(year=2020, month=1, day=1))

        with freeze_time("2020-01-1 12:15:00"):
            self.assertEqual(datetime.timedelta(hours=12, minutes=15), entry.actual_duration)
        self.assertEqual(datetime.timedelta(0), entry.duration)

    def test_is_in_progress(self):
        entry = TimeEntry.objects.create(user=self.user, project=self.project,
                                         start_time=datetime.datetime(year=2020, month=1, day=1))

        self.assertTrue(entry.in_progress)

    def test_duration_of_finished_entry(self):
        entry = TimeEntry.objects.create(user=self.user, project=self.project,
                                         start_time=datetime.datetime(year=2020, month=1, day=1),
                                         duration=datetime.timedelta(hours=12, minutes=15))

        self.assertEqual(datetime.timedelta(hours=12, minutes=15), entry.actual_duration)
        self.assertEqual(datetime.timedelta(hours=12, minutes=15), entry.duration)
